FROM node:alpine

WORKDIR /home/apps

COPY package.json package-lock.json ./

RUN npm install
COPY ./ ./

CMD ["node","index.js"]
