import express, { Express, json, urlencoded } from "express";
import cors from "cors";
import { postRouter } from "./routes/post";

const app: Express = express();

app
  .disable("x-powered-by")
  .use(cors())
  .use(json())
  .use(urlencoded({ extended: false }));

app.use("/api/post", postRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});

export { app };
