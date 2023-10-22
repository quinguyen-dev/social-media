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
import { postRouter } from "./routes/posts";

// todo move this elsewhere
try {
  require("./prisma.client");
} catch (err) {
  console.error(`Unable to connect to database: ${err}`);
  process.exit(1);
}

const app: Express = express();

app
  .disable("x-powered-by")
  .use(cors())
  .use(json())
  .use(urlencoded({ extended: false }));

app.use("/api/posts", postRouter);

/* Error handler middleware */
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

/* Connect to port */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API is running on ${port}`);
});

export { app };
