// Copyright (c) 2025 OllysCoding
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { $ } from "execa";
import { failure, Result, success } from "../result/index.js";
import path from "node:path";
import { fail } from "node:assert";
import { logger } from "../logger.js";
import fs from "fs/promises";

type GifOptions = {
  /**
   * Absolute path to the input file
   */
  filepath: string;
  /**
   * Absolute path to the output folder
   */
  outfolder: string;
  clip: {
    start: number; // milliseconds
    end: number; // milliseconds
  };
  /**
   * Mode:
   * - preview: Quicker, more limited colour palette
   * - final: Slower, better looking
   */
  mode: "preview" | "final";
  /**
   * External .srt subtitle file path, if undefined it is assumed
   * the subittles are embedded in the video file.
   */
  subtitleFilepath?: string;
};
const formatTime = (milliseconds: number): string => {
  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  if (milliseconds > 1000) {
    seconds = Math.floor(milliseconds / 1000);
    milliseconds -= seconds * 1000;
  }
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
  }
  if (minutes > 60) {
    hours = Math.floor(minutes / 60);
    minutes -= hours * 60;
  }

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const generateGif = async (
  opts: GifOptions,
): Promise<Result<string>> => {
  const [name, extension] = path.basename(opts.filepath).split(".");

  if (!path.isAbsolute(opts.filepath)) {
    return failure("Filepath must be absolute");
  }

  if (!path.isAbsolute(opts.outfolder)) {
    return failure("outfolder must be absolute");
  }

  if (opts.subtitleFilepath && !path.isAbsolute(opts.subtitleFilepath)) {
    return failure("subtitleFilepath must be absolute");
  }

  if (!name || !extension) {
    return failure(
      `Unable to determine filename/ext from path ${opts.filepath}`,
    );
  }

  const outpath = path.join(
    opts.outfolder,
    `${name}-${opts.clip.start}-${opts.clip.end}.gif`,
  );

  try {
    await fs.access(outpath, fs.constants.R_OK);
    return success(outpath);
  } catch {
    /* */
  }

  try {
    await $`ffmpeg 
        -ss ${formatTime(opts.clip.start)} 
        -to ${formatTime(opts.clip.end)} 
        -copyts
        -i ${opts.filepath}
        -ss ${formatTime(opts.clip.start)} 
        -to ${formatTime(opts.clip.end)} 
        -vf subtitles=${opts.subtitleFilepath ?? opts.filepath}
        ${outpath}`;

    return success(outpath);
  } catch (err) {
    logger.error(err, `Failed to generate gif for file ${opts.filepath}`);
    return fail(`Failed to generate gif for file ${opts.filepath}`);
  }
};
