import { PrismaClient } from "@prisma/client";

const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;

//globalThis.prisma: This global variable ensure that the Prisma client instance is 
//reused across hot reloads during development. Without this, each time your application 
//reloads, a new instance of the Prisma client would be created , potentially leading 
// to connection issues.