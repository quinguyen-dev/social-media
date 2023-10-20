import { Request, Response, Router, NextFunction } from "express";
import { prismaClient } from "../prisma.client";
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

/* Create a new post */
postRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    // todo: check authentication
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

/* Update a specific post */
postRouter.put(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    // todo look to change to update the entire resource
    try {
      const post = await prismaClient.post.update({
        where: {
          postId: req.body.postId,
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

/* Delete a specific ticket */
postRouter.delete(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    // todo needs to be authenticated to delete a post
    try {
      await prismaClient.post.delete({
        where: {
          postId: req.body.postId,
        },
      });

      res.sendStatus(204);
    } catch (err) {
      // todo 403 forbidden error
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
