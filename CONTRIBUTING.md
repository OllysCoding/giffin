<!--
 Copyright (c) 2025 olly
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

## Running / developing locally

### Project structure

This repo uses npm workspaces and is split into two main top level folders:

- `./apps` - Contains the two 'applications', `server` and `web`.
- `./packages` - Contains all of the packages which can be used by both applications.

### FFMpeg

To run this project locally, FFMPEG must be available in your PATH, for MacOS, you can install it with `brew install ffmpeg`.

### Building docker container 

In project root "pnpm run docker:build"

