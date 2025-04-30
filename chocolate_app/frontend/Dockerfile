FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install && \
    apk add --no-cache libc6-compat

COPY . .


RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]