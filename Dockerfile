FROM node:21-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la /app/utils

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]