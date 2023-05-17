export function filterRefKeys(obj:any): any[] {
    const keys:string[] = Object.keys(obj);
    const refs = [];
    for(let k of keys) {
      if(obj[k].references) {
        refs.push(obj[k])
      }
    }
    return refs
  }