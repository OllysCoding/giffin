// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import Fastify from "fastify";

import errorsPlugin from "./plugins/errors.js";
import { webRoutes } from "./routes/web.js";

// const V1_API_BASE = "/api/v1";

export const initializeApi = async () => {
  const fastify = Fastify({
    logger: true,
  });

  // Register plugins
  fastify.register(errorsPlugin);

  // Register web app
  fastify.register(webRoutes);

  const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  await fastify.listen({ port, host: process.env.HOST });
};
