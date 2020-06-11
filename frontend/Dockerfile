FROM node:14-buster

WORKDIR /src

COPY ./package.json /src
COPY ./package-lock.json /src

RUN npm install

COPY . /src

# expose 3000

CMD ["npm", "start"]
