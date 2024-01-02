########
# BASE #
########
FROM node:18.14.2-alpine as builder

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install

#########
# BUILD #
#########
FROM node:18.14.2-alpine
WORKDIR /app

COPY . .

CMD ["yarn", "dev"]
