import { BaseLogger } from "./base-logger";

class EmailLoggerClass extends BaseLogger {
    constructor(filename: string) {
        super(filename)
    }

    write(data: any) {
        this.logger.info(JSON.stringify(data));
    }
}

const EmailLogger = new EmailLoggerClass('email.log');
export default EmailLogger