import ora from "ora";
import colors from "colors/safe";
import { APP_SETTINGS } from "../app-settings";

type FancyLoggers = 'db'|'init'|'dbsync'|'extra'

class FancyLogger {
    private loggers = {db: ora(), init: ora(), dbsync: ora(), extra: ora()};
    private mode = APP_SETTINGS.NODE_ENV|| 'development';
    private dev = this.mode === 'development';

    private getEnv = this.dev ? colors.green(this.mode) : colors.red(this.mode)

    start(id: FancyLoggers, txt: string) {
        this.loggers[id].start(txt);
    }
    
    log(id: FancyLoggers, txt: string) {
        this.loggers[id].succeed(txt);
    }

    error(id: FancyLoggers, txt: string) {
        this.loggers[id].fail(colors.red(txt));
    }

    logServerInfo() {
        let info = `${this.getEnv} Server started on port ${APP_SETTINGS.PORT}`
        this.log('init',info);
    }

    logForDB() {
        let db = `${this.getEnv} db ${colors.green(APP_SETTINGS.DB_NAME)} connected`
        this.log('db', db);
    }

    logForDbSync() {
        let dbSync = `${this.getEnv} db ${APP_SETTINGS.DB_NAME} synced successfully`
        this.log('dbsync', dbSync);
    }

}


let fancyLogger = new FancyLogger();
export  default fancyLogger