import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getLinkPreviewMiddleware } from "./middleware/getLinkPreviewMiddleware";
import { getLinkPreview } from "./index";

dotenv.config();

const main = async () => {
  const PORT = process.env.PORT;
  const app = express();

  app.use(
    cors({
      origin: process.env.SERVER_URL,
      credentials: true,
    })
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (_req, res) => {
    res.send("URL Processing Service");
  });

  app.post("/api/getpreview", getLinkPreviewMiddleware, (req, res) => {
    const url = req.body.url;

    getLinkPreview(url)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });
};

main();
