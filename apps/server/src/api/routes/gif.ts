// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { FastifyInstance } from "fastify";
import { logger } from "../../logger.js";
import { Static, Type } from "@sinclair/typebox";
import { Container } from "typedi";
import { GIFService } from "../../services/GIFService.js";
import { isFailure } from "../../result/index.js";
import { ApiErrorType } from "../plugins/errors.js";
import fs from "node:fs";

const GifSchema = Type.Object({
  file: Type.String(),
  mode: Type.Union([Type.Literal("preview"), Type.Literal("final")]),
  clip: Type.Object({
    start: Type.Number(),
    end: Type.Number(),
  }),
});

export type GifOptions = Static<typeof GifSchema>;

export const gifRoutes = async (
  fastify: FastifyInstance,
  // options: FastifyRegisterOptions<never>,
) => {
  fastify.post<{ Body: GifOptions }>(
    "/generate",
    {
      schema: { body: GifSchema },
    },
    async (request, reply) => {
      const gifService = Container.get(GIFService);
      const result = await gifService.getGif(request.body);
      if (isFailure(result)) {
        reply.sendError(
          ApiErrorType.UNABLE_TO_GENERATE_GIF,
          result.error.message,
        );
      } else {
        logger.info(`Streaming reponse from "${result.result}"`);
        const stream = fs.createReadStream(result.result);
        reply.header("Content-Type", "image/gif");
        return reply.send(stream);
      }
    },
  );
};
