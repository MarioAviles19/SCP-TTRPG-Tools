import type { Coordinate, RectVerts } from "./types";

export function getDistance(vec1 : Coordinate, vec2 : Coordinate){
    const dx = Math.abs(vec1.x - vec2.x)
    const dy = Math.abs(vec1.y - vec2.y)

    return Math.sqrt(dx * dx + dy * dy)
}

export function getRectOrigin(verts : RectVerts){
    
    return average(average(verts.a, verts.b), average(verts.c, verts.b))

}

export function transformToOrigin(point : Coordinate, origin : Coordinate){
    return {x : point.x - origin.x, y : point.y - origin.y}
}
export function scalePoint(point : Coordinate, origin : Coordinate, factors : Coordinate){


    let transformedCoord = transformToOrigin(point, origin)
    return {x : (transformedCoord.x * factors.x) + origin.y, y : (transformedCoord.y * factors.y) + origin.y}

}
export const unitSquare = {
    a : {x: -1, y: 1},
    b : {x: 1, y: 1},
    c : {x: -1, y: -1},
    d : {x: 1, y: -1}
}
export function rotatePoint(point : Coordinate, origin : Coordinate, angle : number){

    const transPoint = transformToOrigin(point, origin)
    const x = (transPoint.x * Math.cos(angle) - transPoint.y * Math.sin(angle)) + origin.x
    const y = (transPoint.x * Math.sin(angle) + transPoint.y * Math.cos(angle)) + origin.y

    return {x, y}
}
export function angleToPoint(from : Coordinate, to : Coordinate){
    const fromAngle = Math.atan2(from.y, from.x)
    const toAngle = Math.atan2(to.y, to.x)

    return toAngle - fromAngle
}
export function floatEqual(f1 : number, f2: number, e = 0.00001){
    return Math.abs(f1 - f2) > e 
}

function average(point1 : Coordinate, point2 : Coordinate){
    return {x : (point1.x + point2.x) / 2, y : (point1.y + point2.y) / 2}
}
