FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY nodemon.json ./

RUN npm install

RUN npm run postinstall

COPY . .

RUN chown -R node:node /usr/src/app
USER node

EXPOSE 5000

CMD npm run migrate && npm run dev