FROM node:14-stretch-slim

LABEL maintainer="Yahya Wsea <yahya.wsea@gmail.com>"

RUN mkdir -p /app

RUN npm install --global nodemon

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm i && \
  npm audit fix && \
  chown -R node:node /app

COPY --chown=node:node ./ ./

USER node

CMD npm start
