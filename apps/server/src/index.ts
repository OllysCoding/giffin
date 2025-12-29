// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import "reflect-metadata";
import "dotenv/config";

import { Container } from "typedi";

import { initializeApi } from "./api/index.js";

import { logger } from "./logger.js";
import { TestService } from "./services/TestService.js";

const initialize = async () => {
  logger.info("Starting services...");

  await Container.get(TestService).load();

  logger.info("Services successfully started");

  await initializeApi();
};

initialize();
