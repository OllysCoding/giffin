// Copyright 2025 olly
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import fastifyStatic from "@fastify/static";
import { FastifyInstance } from "fastify";
import path from 'node:path';

export const webRoutes = async (
  fastify: FastifyInstance,
  // options: FastifyRegisterOptions<never>,
) => {
    if (typeof process.env.STATIC_FRONTEND_PATH === 'string') {
        fastify.register(fastifyStatic, {
            root: process.env.STATIC_FRONTEND_PATH,
        });
    }
}