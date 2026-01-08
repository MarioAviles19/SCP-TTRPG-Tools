type coordinate = {x : number, y : number}

export class DungeonMap{

    private cMainCanvas : HTMLCanvasElement
    private cGridLayer : HTMLCanvasElement
    private cLayoutLayer : HTMLCanvasElement
    private cSpriteLayer : HTMLCanvasElement

    private mainCtx : CanvasRenderingContext2D
    private gridCtx : CanvasRenderingContext2D
    private layoutCtx : CanvasRenderingContext2D
    private spriteCtx : CanvasRenderingContext2D

    private mouse = {x: 0, y : 0}

    private camera = {
                x: -200,
                y: -200,
                zoom: 1
    }

    private shouldAnimate = true

    private activeLine : {from : coordinate, to: coordinate} | null = null

    private lines : {from : coordinate, to : coordinate}[] = []

    //Bounding box solution for selecting objects?

    gridDensity = 75
    lineWidth = 10

    constructor(canvas : HTMLCanvasElement){
        this.cMainCanvas = canvas;
        this.cGridLayer = document.createElement("canvas")
        this.cLayoutLayer = document.createElement("canvas")
        this.cSpriteLayer = document.createElement("canvas")

        this.setupCanvas(this.cMainCanvas)



        this.mainCtx = this.cMainCanvas.getContext("2d") as CanvasRenderingContext2D
        this.gridCtx = this.cGridLayer.getContext("2d") as CanvasRenderingContext2D
        this.layoutCtx = this.cLayoutLayer.getContext("2d") as CanvasRenderingContext2D
        this.spriteCtx = this.cSpriteLayer.getContext("2d") as CanvasRenderingContext2D

        window.addEventListener("resize", ()=>{this.setupCanvas(this.cMainCanvas)})
        this.cMainCanvas.addEventListener("pointerdown", (ev)=>{this.handlePointerDown(ev)})
        this.cMainCanvas.addEventListener("pointerup", (ev)=>{this.handlePointerUp(ev)})
        this.cMainCanvas.addEventListener("pointermove", (ev)=>{this.handlePointerMove(ev)})
        
    }
    private handlePointerDown(ev : PointerEvent){

        if(ev.shiftKey){
            this.beginCameraDrag(this.mouse)
            return
        }
        const gridPos = this.getClosestGridCoordinate(this.mouse) 
        if(!this.activeLine){
            this.activeLine = {from: gridPos, to : gridPos}
        }
    }
    private handlePointerUp(ev : PointerEvent){
        if(this.activeLine){
            if((this.activeLine.from.x !== this.activeLine.to.x) || (this.activeLine.from.y !== this.activeLine.to.y)){
                this.addObject({...this.activeLine})
            }
            this.activeLine = null
        }
    }
    private handlePointerMove(ev : PointerEvent){
        this.mouse = this.getMousePos(this.cMainCanvas, ev)

        if(ev.shiftKey){
            this.camera.x -= ev.movementX 
            this.camera.y -= ev.movementY 
        }

        if(this.activeLine){
            const closestDot = this.getClosestGridCoordinate(this.mouse)

            this.activeLine.to = this.constrainToAxis(this.activeLine.from, closestDot)
        }
    }
    private constrainToAxis(from : coordinate, to : coordinate){

        const dx = Math.abs(from.x - to.x)
        const dy = Math.abs(from.y - to.y)
        return dx >= dy? {x : to.x, y: from.y} : {x : from.x, y : to.y}
    }
    private addObject(data : {from : coordinate, to : coordinate}){
        this.lines.push(data)
    }
    private setupCanvas(canvas : HTMLCanvasElement){
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d")!;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

        Array.from([this.cGridLayer, this.cLayoutLayer, this.cSpriteLayer]).forEach((canvas)=>{

            canvas.width = this.cMainCanvas.width
            canvas.height = this.cMainCanvas.height
        })


    }
    private getMousePos(canvas: HTMLCanvasElement, ev: MouseEvent) {
        
        const rect = canvas.getBoundingClientRect();
        const screenX = ev.clientX - rect.left;
        const screenY = ev.clientY - rect.top;

        // world space
        return {
            x: screenX / this.camera.zoom + this.camera.x,
            y: screenY / this.camera.zoom + this.camera.y
        };
    }
    private syncLocalStorage(){
        if(typeof window === 'undefined'){
            return
        }
    }
    private beginCameraDrag(position : coordinate){

    }
    private drawGridVisibleArea(ctx: CanvasRenderingContext2D) {
        const spacing = this.gridDensity;
        const r = 5;

        const width  = this.cMainCanvas.width  / this.camera.zoom;
        const height = this.cMainCanvas.height / this.camera.zoom;

        const left   = this.camera.x;
        const top    = this.camera.y;
        const right  = left + width;
        const bottom = top  + height;

        const startX = left - ((left % spacing + spacing) % spacing);
        const startY = top  - ((top  % spacing + spacing) % spacing);
        ctx.fillStyle = "white";
        let first = true
        for (let x = startX; x < right; x += spacing) {
            for (let y = startY; y < bottom; y += spacing) {
                this.drawCircle(ctx, x, y, r)
                if(first){
                }
                first = false
            }
        }
    }
    private drawLayout(ctx: CanvasRenderingContext2D){
        this.lines.forEach((val)=>{
            this.drawLine(ctx, val.from, val.to)
        })
    }
    private drawSprites(ctx: CanvasRenderingContext2D){
        const closestDot = this.getClosestGridCoordinate(this.mouse)
        ctx.fillStyle = "red"
        ctx.fillRect(closestDot.x - 5, closestDot.y - 5, 10, 10)
        if(this.activeLine){
            this.drawLine(ctx, this.activeLine.from, this.activeLine.to, {lineWidth: Math.ceil(this.lineWidth * .8), style: "red"}) // this line
        }
    }
    private getClosestGridCoordinate(pos : {x : number, y : number}){
        return {x: Math.round(pos.x / this.gridDensity) * this.gridDensity, y: Math.round(pos.y / this.gridDensity) * this.gridDensity}
    }
    private drawLine(ctx : CanvasRenderingContext2D, from : coordinate, to : coordinate, 
        options? : {
            lineWidth? : number,
            style? : string
    }){
        const lineWidth = options?.lineWidth || this.lineWidth
        const style = options?.style || "white" 
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.lineWidth = options?.lineWidth || this.lineWidth
        ctx.strokeStyle = style
        ctx.stroke()

        ctx.fillStyle = style
        this.drawCircle(ctx, from.x , from.y , lineWidth / 2)
        this.drawCircle(ctx, to.x , to.y , lineWidth / 2,)
    }
    private drawCircle(ctx : CanvasRenderingContext2D, x : number, y : number, r : number){
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
    }
    private applyCameraTransform(ctx : CanvasRenderingContext2D){


        // Apply camera
        ctx.scale(this.camera.zoom, this.camera.zoom);
        ctx.translate(-this.camera.x, -this.camera.y);

    }
    private clearCanvas(ctx : CanvasRenderingContext2D){
        ctx.setTransform(1, 0, 0, 1, 0, 0); // RESET
        ctx.clearRect(0, 0, this.cMainCanvas.width, this.cMainCanvas.height);
    }
    animate(){

        //this.drawGrid()

        this.clearCanvas(this.mainCtx)
        this.clearCanvas(this.gridCtx)
        this.clearCanvas(this.layoutCtx)
        this.clearCanvas(this.spriteCtx)

        this.applyCameraTransform(this.gridCtx)
        this.applyCameraTransform(this.layoutCtx)
        this.applyCameraTransform(this.spriteCtx)

        this.drawGridVisibleArea(this.gridCtx);
        this.drawLayout(this.layoutCtx)
        this.drawSprites(this.spriteCtx)



        this.mainCtx.drawImage(this.cGridLayer, 0, 0)
        this.mainCtx.drawImage(this.cLayoutLayer, 0, 0)
        this.mainCtx.drawImage(this.cSpriteLayer, 0, 0)

        if(this.shouldAnimate){
            window.requestAnimationFrame(()=>{this.animate()})
        }

    }
}