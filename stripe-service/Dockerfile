FROM node:18.12-alpine

RUN npm i -g node-pre-gyp
RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package*.json .
COPY pnpm* .
RUN pnpm i

COPY index.js .
COPY .env .

CMD pnpm run dev