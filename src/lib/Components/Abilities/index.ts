const classImage : Record<string,string> = {
    "The Interloper" : "/Interloper.webp",
    "The Luck Eater" : "/Luck-Eater.webp",
    "The Reality Bender" : "/Reality-Bender.webp"
} 
const defaultIcon = "/Default-Star.svg"
export function getClassIcon(className : string){
    if(Object.keys(classImage).some((val)=>{return val === className})){
        return classImage[className]
    } else{
        return defaultIcon
    }
}