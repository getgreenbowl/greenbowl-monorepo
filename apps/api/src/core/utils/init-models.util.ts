import fancyLogger from "../logger/fancy-logger";

export function initModels<S>(_sequelize: S, models:any[], ref: string = '') {
    const initiatedModels: any = {};
    for (let m of models) {
      if(m.initModel) {
        const t = m.initModel(_sequelize);
        initiatedModels[t.tableName] = t;
      }

    }
    fancyLogger.log("extra", `${models.length} ${ref} models initiated`);
    return initiatedModels;
  }
