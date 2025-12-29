# Copyright 2025 olly
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
#     https://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM node:24
ARG TARGETARCH

WORKDIR /usr/src/supervisord

# Update package lists
RUN apt-get update

# Install fmpeg
RUN apt-get install -y ffmpeg

# Setup supervisord
RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor
COPY ./supervisord.conf ./supervisord.conf

# Setup typesense
WORKDIR /usr/src/typesense

ARG TYPESENSE_FILE="typesense-server-29.0-linux-${TARGETARCH}.tar.gz"
RUN curl -O "https://dl.typesense.org/releases/29.0/${TYPESENSE_FILE}"
RUN tar -xzf "./${TYPESENSE_FILE}"

# Setup giffgen
WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm*.yaml ./
COPY turbo.json ./
COPY ./apps ./apps
COPY ./packages ./packages
RUN ["pnpm", "i"]
RUN ["pnpm", "run", "build"]
RUN mv ./apps/server/.env.container ./apps/server/.env 

EXPOSE 8080
 
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/usr/src/supervisord/supervisord.conf"]