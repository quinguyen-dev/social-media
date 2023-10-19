import express, { Router, Request, Response } from "express";
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

/* Create a new post */
postRouter.post("/", async function (req: Request, res: Response) {
  // todo: check authentication
  try {
    const resource = await prismaClient.post.create({
      data: {
        authorId: 1,
        content: "This is a new post.",
      },
    });

    res.header(`/posts/${resource.postId}`).status(201).send(resource);
  } catch (err) {
    console.error("This request is not valid!!");
    res.sendStatus(409);
  }
});

/* Get all the post of a specific uers (potentially move to User router) */
postRouter.get("/:userId", async function (req: Request, res: Response) {
  // todo: potentially validate this before attempting to query
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
