import structuredClone from '@ungap/structured-clone';


// class CustomObject {
//     private init: Record<string, unknown> = {}
//     constructor(initObject?: Record<string, unknown>) {
//         if(initObject) {
//             this.init = initObject;
//         }
//     }

//     add(key: string, value:any) {
//         this.init[key] = value
//     }

//     delete(key: string) {
//         delete this.init[key];
//     }

//     value() {
//         return this.init
//     }

//     getValue(key: string) {
//         return this.init[key];
//     }

// }


export const _Object = Object.freeze({
    exclude: <T, K extends keyof T>(obj:T, exclude: K[]) => {
        const clone = structuredClone(obj);
        for(let i of exclude) {
            if(clone[i]) {
                delete clone[i]
            }
        }
        return clone
    },
    deepClone: (obj: Record<string, unknown>) => {
        return structuredClone(obj);
    },
    refine: <T, K extends keyof T>(obj: T): T => {
        const wildCards = {
            undefined: undefined,
            null: null,
            false: false,
            true: true
        }
        const clone = structuredClone(obj);
        const keys = Object.keys(clone) as K[];
        const _wildcards = Object.keys(wildCards)
        for(let k of keys) {
            //@ts-ignore
            if(_wildcards.includes(clone[k])) {
                // @ts-ignore
                clone[k] = wildCards[clone[k]]
            }
        }
        return clone
    },
    merge: (obj:any, add:any) => {
      const fresh = structuredClone(obj);
      return {...fresh, ...add}

    }
});