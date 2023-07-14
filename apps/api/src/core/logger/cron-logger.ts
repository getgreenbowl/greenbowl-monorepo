import { BaseLogger } from "./base-logger";

class CronLoggerClass extends BaseLogger {
    constructor(filename: string) {
        super(filename)
    }

    write(data: any) {
        this.logger.info(JSON.stringify(data));
    }
}

const CronLogger = new CronLoggerClass('cron.log');
export default CronLogger