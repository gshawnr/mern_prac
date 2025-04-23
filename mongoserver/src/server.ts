import { initMongo } from "./db/mongoClient";
import app from "./index";

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await initMongo();
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}`);
    });
  } catch (err) {
    const msg = (err as Error).message || "";
    console.log(`server error: ${msg}`);
  }
};

startServer();
