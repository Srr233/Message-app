FROM node:20.12.2-alpine
WORKDIR /app/
COPY ./nestjs-database-messages .
COPY .env .
EXPOSE 4000
RUN npm install
RUN npm run build
CMD node ./dist/main.js