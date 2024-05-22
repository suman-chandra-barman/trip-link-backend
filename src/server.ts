import { Server } from "http";
import app from "./app";
import config from "./config";

const port = config.port;

const main = async () => {
  const server: Server = app.listen(config.port, () => {
    console.log("App is listen on port", port);
  });
};

main();
