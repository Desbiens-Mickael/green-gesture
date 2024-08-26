FROM node:18.12-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY pnpm* .
COPY .npmrc .

RUN pnpm i

COPY postcss.config.js .
COPY tailwind.config.js .
COPY tsconfig.json .
COPY tsconfig.node.json .
COPY vite.config.ts .
COPY codegen.yml .
COPY .env .

COPY src ./src
COPY public ./public
COPY index.html .



CMD pnpm start