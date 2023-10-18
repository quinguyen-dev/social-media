import { PrismaClient } from "@prisma/client";

/* Create a single instance of the Prisma client to be used */
const prismaClient = new PrismaClient();

/* Export named client object */
export { prismaClient };
