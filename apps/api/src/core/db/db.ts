import { Sequelize, Options, Model, ModelStatic } from "sequelize";
import configs from "../../config/config";
import { APP_SETTINGS } from "../app-settings";
import fancyLogger from "../logger/fancy-logger";
import { filterRefKeys } from "../utils/filter-ref-models.util";
import yargs from "yargs";
import debug from "debug";
import { initModels } from "../utils/init-models.util";
import { models } from "./init-models";
import { _Object } from "dshelpers";
const logError = debug("app:error");

const env = APP_SETTINGS.NODE_ENV || "development";
const config = (configs as { [key: string]: Options })[env];

export class Db {
  static models: Record<string, ModelStatic<Model<{}, {}>>>;

  static instance: Sequelize = new Sequelize({
    ...config,
    pool: { max: 5, idle: 30 },
    logging: false,
  });

  static init() {
    this.authenticate();
    this.associate();
  }

  static associate() {
    for (let child of models) {
     //write association logic from scratch for new db
    }
  }

  static authenticate() {
    fancyLogger.start("db", "connecting db...");
    this.instance
      .authenticate()
      .then(async () => {
        fancyLogger.logForDB();
        const args = await yargs.argv;
        if (args.sync) {
          this.sync();
        }

        if (args.seed) {
          // await runSeeders(this.instance, args.seed)
        }
      })
      .catch((err) => {
        fancyLogger.error("db", err);
      });
  }

  static async syncModels(lc_models: any[]): Promise<boolean> {
    try {
      if (!lc_models && !lc_models) {
        return false;
      }
      const p = [];
      for (let m of lc_models) {
        p.push(m.sync());
      }
      await Promise.all(p);
      return true;
    } catch (error) {
      logError(error);
      return false;
    }
  }

  static sync() {
    fancyLogger.start("dbsync", `syncing db ${APP_SETTINGS.DB_NAME}...`);
    this.instance
      .sync()
      .then(() => {
        fancyLogger.logForDbSync();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);

        fancyLogger.error("dbsync", `Error Connecting db ${err}`);
      })
      .finally(() => {
        this.instance.close();
        process.kill(process.pid, "SIGINT");
      });
  }
}

export default Db;
