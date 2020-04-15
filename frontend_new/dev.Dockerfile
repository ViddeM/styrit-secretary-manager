FROM node:latest

RUN mkdir -p /usr/src/secretary-manager/frontend_new
RUN chown -R node /usr/src/secretary-manager/frontend_new

USER node

WORKDIR /usr/src/secretary-manager/frontend_new

COPY ./src/ .
COPY package.json .
COPY ./public/ .

RUN yarn install
RUN yarn global add react-scripts

EXPOSE 3000


CMD yarn start
