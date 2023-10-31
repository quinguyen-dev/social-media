import { Request, Response, Router, NextFunction } from "express";
import { prismaClient } from "../prisma.client";
import { Prisma } from "@prisma/client";
import createError from "http-errors";

const usersRouter: Router = Router();

/* Testing endpoint for users. Returns 200 if successful. */
usersRouter.get("/", async (_, res: Response, next: NextFunction) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(createError(400, "Critical issue: Endpoint not found."));
  }
});

// /* Get information on a specific user (through id) */
// usersRouter.get(
//   "/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const user = await prismaClient.user.findUniqueOrThrow({
//         where: {
//           userId: req.params.userId,
//         },
//       });

//       res.send(user);
//     } catch (err) {
//       next(
//         createError(
//           404,
//           `Resource not found at /api/users/${req.params.userId}.`
//         )
//       );
//     }
//   }
// );

/* Get information on a specific user (through username) */
usersRouter.get(
  "/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // todo change this in db to be unique
      const user = await prismaClient.user.findFirstOrThrow({
        where: {
          username: req.params.userId,
        },
      });

      res.send(user);
    } catch (err) {
      next(
        createError(
          404,
          `Resource not found at /api/users/${req.params.userId}.`
        )
      );
    }
  }
);

export { usersRouter };
