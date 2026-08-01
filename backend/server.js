import app from "./app.js";
import { PORT } from "./config/env.js";
import connectToDatabse from "./database/mongodb.js";

app.listen(PORT, async () => {
  console.log(`server working at ${PORT}`);

  await connectToDatabse();
});
