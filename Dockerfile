FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --no-audit

COPY ./ /usr/src/app

CMD [ "node", "." ]