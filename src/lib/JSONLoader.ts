import z from "zod";
import Fuse from "fuse.js";

type Listener = () => void;

export class JSONLoader<T extends z.ZodObject> {

    #initialized = false
    #loadedFile : z.infer<T>[] = [] ;



    get loadedFile() : z.infer<T>[]{
        return this.#loadedFile
    }
    set loadedFile(data){
        this.#loadedFile = data
        this.syncLocalStorage()
        this.query({})
        this.query(this.currentQuerry)
        console.log({list: this.list, loaded: this.loadedFile})
    }
    #list : (z.infer<T> & {index : number})[] = []

    get list(){
        return this.#list
    }
    set list(val){
        this.#list = val
        this.notify()
    }

    listeners = new Set<Listener>()

    schema : T
    currentQuerry : {filter? : Partial<z.infer<T>>, sort? : (keyof z.infer<T>)[], search? : {term : string, keys : string[]}} = {}

    constructor(schema : T){
        this.schema = schema
        this.syncLocalStorage()
        this.list = this.loadedFile.map((val, i)=>{return {...val, index : i}})
        this.#initialized = true
        
    }

    loadFile( file : File, onloaded? : ()=>{}){

        const reader = new FileReader()

        reader.addEventListener("load", (data)=>{
            
            const result = data.target?.result
            if(!result){
                console.warn("File not read")
                return;
            }
            try{
                const jsonObj = JSON.parse(result.toString());

                const parsedObj = z.array(this.schema).safeParse(jsonObj)
                this.loadedFile = parsedObj.data || []

                if(parsedObj.error){
                    console.log(parsedObj.error)
                }
                if(onloaded){
                    onloaded()
                }
                this.syncLocalStorage()

            } catch (err){
                console.log(err)
            }
        })

        reader.readAsText(file)

    }
    saveFile(fileName : string){

        const data = JSON.stringify(this.loadedFile)
        this.downloadFile(data, fileName, "application/json")
        
    }

    private downloadFile(data : any, filename : string, type : string) {
    const blob = new Blob([data], { type: type || 'text/plain' });
    const blobURL = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobURL;
    a.download = filename;
    a.style.display = 'none';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
}
    newFile(){
        this.loadedFile = []
    }
    remove(index : number){
        this.loadedFile = this.loadedFile.toSpliced(index, 1)
    }
    add(data : z.infer<T>){
        let payload = Array.from(this.loadedFile)
        if(this.loadedFile){
            const res = this.schema.safeParse(data);
            if(res.error){
                console.log(`Could not add entry: ${res.error}`)
                return {error : res.error}
            } else{
                payload.push(res.data)
                this.loadedFile = payload
            }
        }
    }
    edit(data : z.infer<T>, index : number){
        const res = this.schema.safeParse(data)
        if(res.success){
            this.loadedFile[index] = res.data
        } else{
            console.log(res.error)
            return {error: res.error}
        }

        this.loadedFile = this.loadedFile
    }
    private sortBy(
        list: (z.infer<T> & { index: number })[],
        params: (keyof z.infer<T>)[]
    ) {
        if (!params || params.length === 0) return list;
        
        return list.sort((a, b) => {
            for (const k of params) {
                const av = a[k];
                const bv = b[k];
                
                if (av == null || bv == null) continue;
                
                if (typeof av === "string" && typeof bv === "string") {
                    if (av < bv) return -1;
                    if (av > bv) return 1;
                }
                
                if (typeof av === "number" && typeof bv === "number") {
                    if (av !== bv) return av - bv;
                }
            }
            
            return 0; // all keys equal
        });
    }
    
    private filterBy(list : (z.infer<T> & {index : number})[] , params : Partial<z.infer<T>>){
        if(!params || Object.keys(params).length <= 0){
            return list
        }
        let filtered : (z.infer<T> & {index : number})[] = [];
        list.forEach((val, i)=>{
            let keys = Object.keys(params) as (keyof z.infer<T>)[];
            let match = true;
            keys.forEach((key)=>{

                if(val[key] !== params[key]){
                    match = false;
                }
            })
            if(match){
                filtered.push({...val, index: i})
            }
        })
        return filtered
    }
    private fuzzySearch(term : string, keys : string[]){
        if(!term || keys.length <= 0){
            return this.loadedFile.map((val, i)=>{ return {...val, index : i}})
        }
        const fuse = new Fuse(this.loadedFile, {keys, threshold: 0.2})
        const result = fuse.search(term)
        return result.map((val)=>{return {...val.item, index : val.refIndex}})
    }
    query(options : {filter? : Partial<z.infer<T>>, sort? : (keyof z.infer<T>)[], search? : {term : string, keys : string[]}}){
        if(!options || Object.keys(options).length === 0){
            this.list = this.loadedFile.map((val, i)=>{return {...val, index : i}})
        }
        if(options.search){
            this.list = this.fuzzySearch(options.search.term, options.search.keys)
        }
        if(options.filter){
            this.list = this.filterBy(this.list, options.filter)
        }
        if(options.sort){
            this.list = this.sortBy(this.list, options.sort)
        }
        this.currentQuerry = options
    }

    subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    for (const fn of this.listeners) fn();
  }
    private syncLocalStorage(){
        if(typeof window === 'undefined'){
            return
        }
        const storedFile = window.localStorage.getItem(Object.keys(this.schema.shape).join("-"))
        if(storedFile && !this.#initialized){
            //TODO: add validation
            this.#loadedFile = JSON.parse(storedFile) as z.infer<T>[]
            return
        } 
        if(this.loadedFile.length > 0){
            console.log(this.loadedFile)
            window.localStorage.setItem(Object.keys(this.schema.shape).join("-"), JSON.stringify(this.loadedFile))
        } else{
            window.localStorage.removeItem(Object.keys(this.schema.shape).join("-"))
        }
    }
}