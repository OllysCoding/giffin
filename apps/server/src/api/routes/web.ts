// Copyright (c) 2025 olly
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import fastifyStatic from "@fastify/static";
import { FastifyInstance } from "fastify";
import { logger } from "../../logger.js";

export const webRoutes = async (
  fastify: FastifyInstance,
  // options: FastifyRegisterOptions<never>,
) => {
  if (typeof process.env.STATIC_FRONTEND_PATH === "string") {
    logger.info("Serving the web application on /app");
    fastify.register(fastifyStatic, {
      root: process.env.STATIC_FRONTEND_PATH,
      prefix: "/app",
    });

    fastify.get("/app", (_req, reply) => {
      reply.sendFile("/index.html");
    });
  }
};
