import z from "zod";
import { AbilityData } from "./types";

class AbilityLoader {

    loadedFile : AbilityData[] | undefined;
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

                const parsedObj = z.array(AbilityData).safeParse(jsonObj)
                this.loadedFile = parsedObj.data

                if(parsedObj.error){
                    console.log(parsedObj.error)
                }
                if(onloaded){
                    onloaded()
                }

            } catch (err){
                console.log(err)
            }
        })

    }
}