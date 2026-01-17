import { BoundingBox, MapObject } from "../MapObject";
import type { Coordinate, RectVerts } from "../types";
import { angleToPoint, rotatePoint, scalePoint } from "../util";
import { WallNode } from "./WallNode";

export class Wall extends MapObject{

    node1 : WallNode
    node2 : WallNode

    thickness : number
    verts : RectVerts
    constructor(startPos : Coordinate, endPos : Coordinate, thickness : number){
        super()
        this.node1 = new WallNode(this, startPos)
        this.node2 = new WallNode(this, endPos)
        this.thickness = thickness

        this.verts = this.GenerateVertices()
        this.boundingBox = new BoundingBox(this.verts)

    }
    protected GenerateVertices(){
        const angleToNode = angleToPoint(this.node1.position, this.node2.position)

        const a = rotatePoint({...this.node2.position, x: this.node2.position.x - this.thickness / 2} , this.node2.position, angleToNode)
        const b = rotatePoint({...this.node2.position, x: this.node2.position.x + this.thickness / 2} , this.node2.position, angleToNode)
        const c = rotatePoint({...this.node1.position, x: this.node1.position.x - this.thickness / 2} , this.node1.position, angleToNode)
        const d = rotatePoint({...this.node1.position, x: this.node1.position.x + this.thickness / 2} , this.node1.position, angleToNode)
        return {a, b, c, d}
    }
}