import { BoundingBoxBoundsException } from "./Errors"
import type { Coordinate, RectVerts, Rotation, Scale } from "./types"
import { floatEqual, getDistance, getRectOrigin, rotatePoint, scalePoint, transformToOrigin, unitSquare } from "./util"
export abstract class MapObject{

    position : Coordinate = {x: 0, y: 0}
    boundingBox : BoundingBox | undefined
    children : MapObject[] = []
    parent : MapObject | undefined

    appendChild(obj : MapObject){
        obj.parent = this
        this.children.push(obj)
    }
}

export class BoundingBox{
    verts : RectVerts
    child : BoundingBox | undefined
    parent : BoundingBox | undefined
    isAxisAligned : boolean

    constructor(verts : RectVerts, parent? : BoundingBox){
        this.verts = verts
        if(parent){
            this.parent = parent
        }
        this.isAxisAligned = BoundingBox.isAxisAligned(verts)
        if(!this.isAxisAligned){
            let AABB = BoundingBox.toAxisAligned(verts)
            AABB.setChild(this)
            //please don't loop infinitely
            return AABB
        }
    }

    static isAxisAligned(verts : RectVerts){
        //TODO: watch out for floating points
        if(floatEqual(verts.a.x, verts.c.x)){return false} 
        if(floatEqual(verts.b.x, verts.d.x)){return false}
        if(floatEqual(verts.a.y, verts.c.y)){return false}
        if(floatEqual(verts.c.y, verts.d.y)){return false}
        return true
    }
    static transformPoint(innerBox : BoundingBox, outerBox : BoundingBox, point : Coordinate){

        //This assumes that box1 and box2 have the same position

        const origin = getRectOrigin(outerBox.verts)

        //Scale
        const height = getDistance(innerBox.verts.a, innerBox.verts.c)
        const width = getDistance(innerBox.verts.a, innerBox.verts.b)


        const xScaleFactor = getDistance(outerBox.verts.a, outerBox.verts.b) / width
        const yScaleFactor = getDistance(outerBox.verts.a, outerBox.verts.c) / height
        const scaleFactors = {x: xScaleFactor, y : yScaleFactor}
        const scaled = scalePoint(point, origin, scaleFactors)

        //Rotate

        const transformedOuterA = transformToOrigin(scalePoint(outerBox.verts.a, origin, scaleFactors), origin)
        const transformedInnerA = transformToOrigin(scalePoint(innerBox.verts.a, origin, scaleFactors), origin)
        //Get angle from outer box to inner box
        const outerAngle = Math.atan2(transformedOuterA.y, transformedOuterA.x) * 180 / Math.PI
        const innerAngle = Math.atan2(transformedInnerA.y, transformedInnerA.x) * 180 / Math.PI
        
        const dAngle = Math.abs(outerAngle - innerAngle)

        const conversionAngle = 360 - dAngle

        return rotatePoint(scaled, origin, conversionAngle)

    }

    static containsRect(box1 : RectVerts, box2: RectVerts){
        if(box1.a.x >= box2.a.x){return false}
        if(box1.a.y >= box2.a.y){return false}
        if(box1.b.x <= box2.b.x){return false}
        if(box1.b.y >= box2.b.y){return false}
        if(box1.c.x >= box2.c.x){return false}
        if(box1.c.y <= box2.c.y){return false}
        if(box1.d.x >= box2.d.x){return false}
        if(box1.d.y <= box2.d.y){return false}
        return true
    }
    static containsPoint(rect : RectVerts, point : Coordinate){
        if(rect.a.x >= point.x){return false}
        if(rect.a.y >= point.y){return false}
        if(rect.b.x <= point.x){return false}
        if(rect.b.y >= point.y){return false}
        if(rect.c.x >= point.x){return false}
        if(rect.c.y <= point.y){return false}
        if(rect.d.x >= point.x){return false}
        if(rect.d.y <= point.y){return false} 
        return true
    }
    static fromRect(position : Coordinate, w : number, h : number){
        const keys = Object.keys(unitSquare) as (keyof RectVerts)[]
        let verts = {} as RectVerts
        keys.forEach((val)=>{
            verts[val] = {x : (unitSquare[val].x * w) + position.x, y: (unitSquare[val].y * h) + position.y}
        })
        return new BoundingBox(verts)
    }
    static toAxisAligned(verts : RectVerts){
        const leftBound = Math.min(Math.min(verts.a.x, verts.b.x), Math.min(verts.c.x, verts.d.x))
        const rightBound = Math.max(Math.max(verts.a.x, verts.b.x), Math.max(verts.c.x, verts.d.x))
        const bottomBound = Math.min(Math.min(verts.a.y, verts.b.y), Math.min(verts.c.y, verts.d.y))
        const topBound = Math.max(Math.max(verts.a.y, verts.b.y), Math.max(verts.c.y, verts.d.y))
        return new BoundingBox({
            a: {x: leftBound, y : topBound},
            b: {x: rightBound, y : topBound},
            c: {x: leftBound, y : bottomBound},
            d: {x: rightBound, y : bottomBound},
        })
    }
    inBounds(point : Coordinate){
        if(this.isAxisAligned && !this.child){
            return BoundingBox.containsPoint(this.verts, point)
        } else if (this.isAxisAligned && this.child){
            return BoundingBox.containsPoint(this.verts, BoundingBox.transformPoint(this.child, this, point))
        } else if(!this.isAxisAligned){
            throw new BoundingBoxBoundsException("Should not be testing if OBB is inBounds. Instead test on parent")
        }
        console.warn("inBounds did not find a valid case")
        return false
    }
    setChild(child : BoundingBox){
        this.child = child
        this.child.parent = this
    }
}
export class Transform{
    position : Coordinate
    rotation : Rotation
    scale : Scale

    constructor(position : Coordinate, rotation : Rotation, scale : Scale){
        this.position = position
        this.rotation = rotation
        this.scale = scale

    }
}