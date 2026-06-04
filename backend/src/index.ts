import { env } from "./config/env";
import app from "./app";
import { startScheduler } from "./lib/scheduler";

startScheduler();

app.listen(env.PORT, () => {
  console.log(`Server running on http://localhost:${env.PORT}`);
});
