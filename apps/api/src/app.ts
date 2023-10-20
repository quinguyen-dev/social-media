import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import createError, { HttpError } from "http-errors";
import cors from "cors";
import { postRouter } from "./routes/post";

const app: Express = express();
// todo: check if database can even be connected to. Terminate otherwise

app
  .disable("x-powered-by")
  .use(cors())
  .use(json())
  .use(urlencoded({ extended: false }));

app.use("/api/posts", postRouter);

app
  .use(async (req: Request, res: Response, next: NextFunction) => {
    next(createError(404, "Resource not found."));
  })
  .use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  });

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});

export { app };
