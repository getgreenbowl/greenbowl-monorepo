import fancyLogger from "../logger/fancy-logger";

export function initModels<S>(models:any[], ref: string = '') {
    const initiatedModels: any = {};
    for (let m of models) {
      console.log(m.tableName, "check");
      
    }
    fancyLogger.log("extra", `${models.length} ${ref} models initiated`);
    return initiatedModels;
  }
