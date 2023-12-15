import express from "express";
import { nextApp, nextHandler } from "./next-utils";
import { getPayloadClient } from "./get-payload";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const start = async () => {
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL: ${cms.getAdminURL()}`)
      },
    },
  })

  app.use((req,res)=>nextHandler(req,res))
  nextApp.prepare().then(() => {
    app.listen(PORT, async () => {
     console.log(`Listening on http://localhost:${PORT}`);
    })
  })
};
start()