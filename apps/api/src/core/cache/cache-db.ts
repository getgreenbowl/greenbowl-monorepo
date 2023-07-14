import { Model, ModelStatic, Sequelize } from "sequelize";
import fancyLogger from "../logger/fancy-logger";
import { Cache } from "./cache-model";


export class CacheDB {
    static model: ModelStatic<Model<{}, {}>>;

    static db: Sequelize = new Sequelize('sqlite::memory:', {
        logging: false
    });


    static init() {
        this.authenticate();
        this.model = Cache.initModel(this.db)
    }

    static authenticate () {
        this.db.authenticate().then(() => {
            this.db.sync({force: true}).then(() => {
                fancyLogger.log('extra', 'In memory cache synced')
            })
            fancyLogger.log('extra', 'In memory cache activated')
        })
    }
}