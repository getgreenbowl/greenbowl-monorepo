import { BaseLogger } from "./base-logger";

class InfoLoggerClass extends BaseLogger {
    constructor(filename: string) {
        super(filename);
    }

    write(data: any) {
        this.logger.info(JSON.stringify(data));
    }
}

const InfoLogger = new InfoLoggerClass("info.log");
export default InfoLogger;