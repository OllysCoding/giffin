// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Service } from "typedi";
import { GiffinService } from "./types.js";
import { success } from "../result/index.js";

@Service()
export class GIFService implements GiffinService {
  constructor() {}

  public load = () => {
    return Promise.resolve(success(undefined));
  };

  public unload = () => {
    return Promise.resolve(success(undefined));
  };

  public run = () => {
    // Do Nothing
    return Promise.resolve(success(undefined));
  };
}
