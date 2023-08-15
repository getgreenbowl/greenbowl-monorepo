import { Sequelize, Options, Model, ModelStatic } from 'sequelize';
import configs from '../../config/config';
import { APP_SETTINGS } from '../app-settings';
import fancyLogger from '../logger/fancy-logger';
import { filterRefKeys } from '../utils/filter-ref-models.util';
import yargs from 'yargs';
import debug from 'debug';
import SQLite from 'sqlite3';

// import { _Object } from "dshelpers";
const logError = debug('app:error');

const env = APP_SETTINGS.NODE_ENV || 'development';
const config = (configs as { [key: string]: Options })[env];

const replaceModelNames = {
  Users: 'User',
  UserAddresses: 'UserAddress',
};

export class DbConnection {
  static models: Record<string, ModelStatic<Model<object, object>>>;

  static db: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.db',
    dialectOptions: {
      mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
    },
    pool: { max: 5, idle: 30 },
    logging: false,
  });

  static init() {
    this.authenticate();
    this.associate();
    // for (const model of models) {
    //   console.log(model)
    // }
  }

  static associate() {
    const modelKeys = Object.keys(this.db.models);
    for (const m of modelKeys) {
      const child = this.db.models[m];
      const refs = filterRefKeys(child.getAttributes());
      for (const r of refs) {
        let modelName = r.references.model;
        if (r.references.model in replaceModelNames) {
          modelName = replaceModelNames[r.references.model];
        }
        const parent = this.db.models[modelName];
        let options: any = { foreignKey: r.references.key || r.field };
        if (r.references.as) {
          options = { ...options, as: r.references.as };
        }
        parent.hasMany(child, options);
        child.belongsTo(parent, options);
      }
    }
  }

  static authenticate() {
    fancyLogger.start('db', 'connecting db...');
    this.db
      .authenticate()
      .then(async () => {
        fancyLogger.logForDB();
        this.sync();

        const args = await yargs.argv;
        if (args.sync) {
          this.sync();
        }

        if (args.seed) {
          // await runSeeders(this.db, args.seed)
        }
      })
      .catch((err) => {
        fancyLogger.error('db', err);
      });
  }

  static async syncModels(lc_models: any[]): Promise<boolean> {
    try {
      if (!lc_models && !lc_models) {
        return false;
      }
      const p = [];
      for (const m of lc_models) {
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
    fancyLogger.start('dbsync', `syncing db ${APP_SETTINGS.DB_NAME}...`);
    this.db
      .sync()
      .then(() => {
        fancyLogger.logForDbSync();
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);

        fancyLogger.error('dbsync', `Error Connecting db ${err}`);
      })
      .finally(() => {
        // this.db.close();
        // process.kill(process.pid, 'SIGINT');
      });
  }
}

export default DbConnection;
