FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

RUN npm install

RUN npm run postinstall
RUN npm run migrate

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]