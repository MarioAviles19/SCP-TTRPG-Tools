import type { NPCSchema } from "$lib/types";
import { Subscriber } from "$lib/util/utils";

export class Encounter{
    allies: Combatant[] = []
    opponents : Combatant[] = []
    currentRound: number = 0
    currentTurn: number = 0
    subscriber = new Subscriber()
    

    addAlly(ally : Combatant){
        this.allies.push(ally)
        this.subscriber.notify()
    }
    addOpponent(opp : Combatant){
        this.opponents.push(opp)
        this.subscriber.notify()
    }
    removeAlly(index : number){
        this.allies.splice(index, 1)
        this.subscriber.notify()
    }
    removeOpponent(index : number){
        this.opponents.splice(index, 1)
        this.subscriber.notify()
    }
}


export class Combatant{
    currentHealth : string
    isAlly : boolean
    turnNumber : number = -1
    deathSaves : string = ""
    notes : string = ""
    subscriber = new Subscriber()
    characterInfo : NPCSchema
    constructor(npcInfo : NPCSchema, isAlly : boolean){
        this.currentHealth = npcInfo.hitPoints.toString()
        this.isAlly = isAlly
        this.characterInfo = npcInfo
    }
    //TODO: I'm sure there is something I can wrap variables with to make this easier
    setTurnNumber(num : number){
        this.turnNumber = num
        this.subscriber.notify()
    }
    setCurrentHealth(num : string){
        this.currentHealth = num.toString()
        this.subscriber.notify()
    }
    setDeathSaves(num : string){
        this.deathSaves = num
        this.subscriber.notify()
    }

}