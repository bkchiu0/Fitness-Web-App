import express from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import bodyParser from "body-parser";

import loader from "./loaders";

const app = express();
const port = 27017;
const host = "192.168.99.100";

async function connect() {
  const connection = await mongoose.connect(`mongodb://${host}:${port}/db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // Enable CORS
  app.use(cors());
  // Parses incoming requests as JSON if parsable
  app.use(bodyParser.json());
  // Compresses all response json bodies
  app.use(compression());

  await loader(app, connection);

  return Promise.resolve();
}

connect()
  .then(() => {
    app.listen(port, () =>
      console.log(`Node is now listening on ${host}:${port}`)
    );
  })
  .catch(() => {
    console.error("Node failed to initialize.");
  });
