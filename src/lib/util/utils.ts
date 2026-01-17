type Listener = () => void;
export class Subscriber{
    private listeners = new Set<Listener>()

    notify(){
        for(const fn of this.listeners) fn()
    }
    subscribe(fn : Listener){
        this.listeners.add(fn)
    }
}