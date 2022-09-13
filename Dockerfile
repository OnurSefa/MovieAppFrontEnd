FROM node:alpine

WORKDIR .

COPY . .

RUN npm i

CMD ["npm", "run", "start"]