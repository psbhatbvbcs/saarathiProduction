FROM node:18-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV REACT_APP_BASE_URL=http://localhost:8080/api

CMD [ "npm", "start"]