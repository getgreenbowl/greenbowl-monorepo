export const toggleInArray = (a:any[], data:any) => {
  const arr = [...a];
      const index = arr.findIndex(x => x == data);
      if(index<0) {
        arr.push(data);
      }else {
        arr.splice(index, 1);
      }
      return arr;
}
