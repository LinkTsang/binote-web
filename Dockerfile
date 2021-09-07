FROM node:lts-alpine as builder

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY ["package*.json", "patches/", "./"]
COPY ["patches", "./patches"]
USER node
RUN npm install

FROM node:lts-alpine as app

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --from=builder /home/node/app/node_modules ./node_modules

COPY --chown=node:node . .

EXPOSE 8080
CMD ["npm", "start"]
