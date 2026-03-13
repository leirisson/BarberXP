"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// apps/api/src/main.ts
var import_config = require("dotenv/config");

// apps/api/src/server.ts
var import_fastify = __toESM(require("fastify"));

// packages/shared/src/env.ts
var env = {
  port: Number(process.env.PORT ?? 3334),
  nodeEnv: process.env.NODE_ENV ?? "development",
  databaseUrl: process.env.DATABASE_URL ?? ""
};

// packages/infrastructure/src/prismaClient.ts
var prismaInstance = null;
async function getPrisma() {
  if (prismaInstance) return prismaInstance;
  try {
    const { PrismaClient } = await import("@prisma/client");
    prismaInstance = new PrismaClient({
      datasources: {
        db: {
          url: env.databaseUrl || process.env.DATABASE_URL
        }
      }
    });
    return prismaInstance;
  } catch {
    return null;
  }
}
async function checkDbAlive() {
  const client = await getPrisma();
  if (!client) return false;
  try {
    await client.$connect();
    await client.$disconnect();
    return true;
  } catch {
    return false;
  }
}

// apps/api/src/server.ts
function buildServer() {
  const app = (0, import_fastify.default)({ logger: true });
  app.get("/health", async () => {
    const dbConnected = await checkDbAlive();
    return { status: "ok", dbConnected };
  });
  return app;
}

// apps/api/src/main.ts
async function start() {
  try {
    try {
      const prisma = await getPrisma();
      if (prisma) {
        await prisma.$connect();
        console.log("Conex\xE3o com banco estabelecida.");
      } else {
        throw new Error("Prisma Client n\xE3o dispon\xEDvel");
      }
      console.log("Conex\xE3o com banco estabelecida.");
    } catch (e) {
      console.warn(
        "N\xE3o foi poss\xEDvel conectar ao banco. A API iniciar\xE1 mesmo assim.",
        e instanceof Error ? e.message : e
      );
    }
    const app = buildServer();
    const address = await app.listen({ port: env.port, host: "0.0.0.0" });
    app.log.info(`API dispon\xEDvel em ${address}`);
  } catch (err) {
    console.error("Erro ao iniciar servidor:", err);
    process.exit(1);
  }
}
start();
//# sourceMappingURL=main.js.map