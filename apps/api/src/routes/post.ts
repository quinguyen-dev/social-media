import express, { Router, Request, Response, NextFunction } from "express";
import { prismaClient } from "../prisma.client";

const postRouter: Router = express.Router();

/* Testing endpoint for post. Returns 200 if successful. */
postRouter.get("/", async function (_, res: Response) {
  try {
    res.sendStatus(200);
  } catch (err) {
    console.error("This endpoint seems to be broken,");
    res.sendStatus(400);
  }
});

/* Get all the post of a specific user */
postRouter.get("/:userId", async function (req: Request, res: Response) {
  try {
    const posts = await prismaClient.post.findMany({
      where: {
        authorId: parseInt(req.params.userId),
      },
      orderBy: {
        creationDate: "asc",
      },
    });

    res.send(posts);
  } catch (err) {
    console.error("This request is not valid!!");
    res.sendStatus(400);
  }
});

export { postRouter };
