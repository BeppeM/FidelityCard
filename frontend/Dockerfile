FROM node:current-alpine
RUN apk update && apk add bash
WORKDIR /core

ENV PATH="./node_modules/.bin:$PATH"

#install app dependencies
COPY package.json ./
COPY package-lock.json ./
COPY ./wait-for-it.sh /wait-for-it.sh
RUN npm install

COPY . .

ENTRYPOINT ["/wait-for-it.sh", "gateway:8080", "--timeout=30", "--", "npm", "start"]

