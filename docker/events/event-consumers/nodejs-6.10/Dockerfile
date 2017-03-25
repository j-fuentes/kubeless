FROM node:6.10-alpine

RUN apk add --no-cache git
RUN npm install --global kafka-node

ADD kubeless.js .

CMD ["node", "/kubeless.js"]
