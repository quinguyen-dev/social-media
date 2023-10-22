import { Request, Response, Router, NextFunction } from "express";
import { prismaClient } from "../prisma.client";
import { Prisma } from "@prisma/client";
import createError from "http-errors";

const postRouter: Router = Router();

/* Testing endpoint for post. Returns 200 if successful. */
postRouter.get("/", async (_, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(createError(400, "Critical issue: Endpoint not found."));
  }
});

/* Get a specific post (will need to check for posted or not) */
postRouter.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    // todo filter parameter for posted = false once implemented
    try {
      const post = await prismaClient.post.findFirstOrThrow({
        where: {
          postId: parseInt(req.params.postId),
        },
      });

      res.send(post);
    } catch (err) {
      next(
        createError(
          404,
          `Resource not found at /api/posts/${req.params.postId}.`
        )
      );
    }
  }
);

/* Create a new post */
// todo potentially doesn't need this (needs auth to be begin with)
postRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await prismaClient.post.create({
        data: {
          authorId: req.body.authorId,
          content: req.body.content,
        },
      });

      res.header(`/posts/${post.postId}`).status(201).send(post);
    } catch (err) {
      next(createError(409, "Unable to create resource."));
    }
  }
);

/* Update a specific post (replace entire resource) */
// todo potentially doesn't need this (needs auth to be begin with)
postRouter.put(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedPost = req.body as Prisma.PostUpdateInput;

    try {
      const post = await prismaClient.post.update({
        where: {
          postId: parseInt(req.params.postId),
        },
        data: updatedPost,
      });

      res.header(`/posts/${post.postId}`).send(post);
    } catch (err) {
      next(
        createError(
          409,
          `Resource not found at /api/posts/${req.params.postId}.`
        )
      );
    }
  }
);

/* Update a specific post (replace part of resource) */
// todo potentially doesn't need this (needs auth to be begin with)
postRouter.patch(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await prismaClient.post.update({
        where: {
          postId: parseInt(req.params.postId),
        },
        data: {
          content: req.body.content,
        },
      });

      res.header(`/posts/${post.postId}`).send(post);
    } catch (err) {
      next(
        createError(
          409,
          `Resource not found at /api/posts/${req.params.postId}.`
        )
      );
    }
  }
);

/* Delete a specific post */
// todo potentially doesn't need this (needs auth to be begin with)
postRouter.delete(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await prismaClient.post.delete({
        where: {
          postId: parseInt(req.params.postId),
        },
      });

      res.sendStatus(204);
    } catch (err) {
      next(
        createError(
          409,
          `Resource not found at /api/posts/${req.params.postId}.`
        )
      );
    }
  }
);

export { postRouter };
