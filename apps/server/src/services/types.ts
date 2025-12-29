// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import type { Result } from "../result/index.js";

export interface GiffinService {
  load: () => Promise<Result<unknown>>;
  unload: () => Promise<Result<unknown>>;
  run: () => Promise<Result<unknown>>;
}
