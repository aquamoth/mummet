import { addOrReplace } from 'mummet-core'
import { Tracked, Dictionary } from 'mummet-core/dist/types';

export default (text: string)=> "Hello " + text;


type Projector = {}


export const reducer = ()=> {
    const x: Tracked<number> = track(4);


    const isDirty = (x.current !== x.underlying)

    
    let  state: Dictionary<Tracked<Projector>, string> = undefined

}






function track<T>(entity: T): Tracked<T> {
    return { loaded: entity, underlying: entity, current: entity };
}
