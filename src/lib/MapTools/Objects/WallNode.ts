import { BoundingBox, MapObject } from "../MapObject";
import type { Coordinate } from "../types";
import type { Wall } from "./Wall";

export class WallNode extends MapObject{
    constructor(parent : Wall, position : Coordinate){
        super()
        this.parent = parent
        this.position = position
        this.boundingBox = BoundingBox.fromRect(position, parent.thickness, parent.thickness)
    }
}