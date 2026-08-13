import HotbarContent from "./HotbarContent.svelte"
import HotbarItem from "./HotbarItem.svelte"
import HotbarRoot from "./HotbarRoot.svelte"

export const ctx = Symbol()

export type HotbarContext = {
    selected : string
}

const Hotbar = {
    Root : HotbarRoot,
    Content : HotbarContent,
    Item : HotbarItem
}
export default Hotbar