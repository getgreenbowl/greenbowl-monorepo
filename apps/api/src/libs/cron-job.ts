import cron from "node-cron";


const cronTimings = {
  everyDayAt6am: "00 06 * * *",
  everyMinute: "* * * * *",
} as const;

export class Cronjob {
  static async startAll() {

  }

}
