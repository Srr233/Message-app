FROM node:20.12.2-alpine
WORKDIR /reactApp/
COPY ./react-ts-message .
COPY .env .
EXPOSE 3000
RUN npm run build
RUN npm install -g serve
CMD serve -s build