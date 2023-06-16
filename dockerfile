FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npm run postinstall

COPY . .

EXPOSE 3000

CMD npm run migrate && npm run dev
