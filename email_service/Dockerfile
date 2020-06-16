FROM node:14-buster

WORKDIR /src

COPY ./package.json /src
COPY ./package-lock.json /src

RUN npm install

COPY . /src

CMD ["./node_modules/.bin/nodemon", "app.js"]
