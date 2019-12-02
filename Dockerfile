FROM node:11-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

ENV NODE_ENV=production

RUN npm install

COPY . /usr/src/app/

EXPOSE 4000

CMD ["npm", "start"] 