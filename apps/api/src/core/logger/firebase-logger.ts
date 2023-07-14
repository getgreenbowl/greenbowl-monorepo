import { BaseLogger } from "./base-logger";

class FirebaseLoggerClass extends BaseLogger {
  constructor(filename: string) {
    super(filename);
  }

  write(data: any) {
    this.logger.error(JSON.stringify(data));
  }
}

const FirebaseLogger = new FirebaseLoggerClass("error.log");
export default FirebaseLogger;
