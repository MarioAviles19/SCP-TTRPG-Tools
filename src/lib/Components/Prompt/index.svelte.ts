
let promptOpen = $state(false)

let promptOptions = $state<{text: string, onresponse : PromptResponse}>()

export function getPromptOptions(){
    return {
        get promptOptions(){return promptOptions},
        set promptOptions(val){promptOptions = val}
    }
}
export function getPromptState(){
    return {
        get promptOpen(){return promptOpen},
        set promptOpen(val){promptOpen = val}
    }
}

export function askPrompt(text: string, fn : PromptResponse){
    promptOptions = {
        text,
        onresponse : fn
    }
    promptOpen = true
}

type PromptResponse = (affirmative : boolean)=>void