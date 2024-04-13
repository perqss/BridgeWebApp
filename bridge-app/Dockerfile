FROM node
MAINTAINER quereste
WORKDIR /bridge/

COPY package.json /bridge/
COPY package-lock.json /bridge/
COPY tsconfig.json /bridge/
COPY public/ /bridge/public
COPY src/ /bridge/src

RUN npm install

CMD ["npm", "start"]

