import cron from "node-cron";

export function startScheduler(): void {
  cron.schedule("0 20 * * *", () => {
    console.log("[cron] Reminder: don't forget to log today's expenses");
  });

  console.log("[cron] Scheduler started");
}
