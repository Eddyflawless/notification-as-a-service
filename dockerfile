FROM node:12-alpine 

RUN mkdir -p /home/app 

WORKDIR /home/app

COPY package*.json ./

RUN npm install --production

RUN npm install -g nodemon

COPY  ./ ./

EXPOSE 3001

CMD ["nodemon", "server.js"]


