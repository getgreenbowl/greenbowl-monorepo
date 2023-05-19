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

export class DbConnection {
  static models: Record<string, ModelStatic<Model<{}, {}>>>;

  static db: Sequelize = new Sequelize({
    ...config,
    pool: { max: 5, idle: 30 },
    logging: false,
  });

  static init() {
    this.authenticate();
    this.models = initModels(this.db, models);
    this.associate();
  }

  static associate() {
    const modelKeys = Object.keys(this.models);
    for (let m of modelKeys) {
      const child = this.models[m];
      const refs = filterRefKeys(child.getAttributes());
      for (let r of refs) {
        const parent = this.models[r.references.model];
        let options: any = { foreignKey: r.references.key || r.field };
        if (r.references.as) {
          options = _Object.merge(options, { as: r.references.as });
        }
        parent.hasMany(child, options);
        child.belongsTo(parent, options);
      }
    }
  }

  static authenticate() {
    fancyLogger.start("db", "connecting db...");
    this.db
      .authenticate()
      .then(async () => {
        fancyLogger.logForDB();
        const args = await yargs.argv;
        if (args.sync) {
          this.sync();
        }

        if (args.seed) {
          // await runSeeders(this.db, args.seed)
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
    this.db
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
        this.db.close();
        process.kill(process.pid, "SIGINT");
      });
  }
}

export default DbConnection;
