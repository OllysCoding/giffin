// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Service } from "typedi";
import { GiffinService } from "./types.js";
import { Result, success } from "../result/index.js";
import { generateGif } from "../ffmpeg/index.js";
import { GifOptions } from "../api/routes/gif.js";
import path from "node:path";
import fs from "node:fs";
import { logger } from "../logger.js";

type CachedGif = {
  filepath: string;
  filesize: string;
};

@Service()
export class GIFService implements GiffinService {
  private cache: Record<string, CachedGif> = {};

  constructor() {}

  /**
   *
   * @returns Absolute filepath for GIF
   */
  public getGif = (opts: GifOptions): Promise<Result<string>> => {
    const genOpts: Parameters<typeof generateGif>[0] = {
      filepath: path.join(process.env.MEDIA_PATH as string, opts.file),
      outfolder: process.env.OUTPUT_PATH as string,
      mode: opts.mode,
      clip: opts.clip,
    };

    // Niave check for a subtitle file
    const [filename] = path.basename(opts.file).split(".");
    const folder = path.dirname(genOpts.filepath);
    const potentialSubtitle = path.join(folder, `${filename}.en.srt`);
    if (fs.existsSync(potentialSubtitle)) {
      logger.debug(`Using external subtitles at path "${potentialSubtitle}"`);
      genOpts.subtitleFilepath = potentialSubtitle;
    }

    return generateGif(genOpts);
  };

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
