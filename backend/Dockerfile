#FROM node:10.24.1
#FROM alpine:latest
#RUN apk add --update docker openrc


#RUN rc-update add docker boot
FROM ubuntu:latest
CMD ['bash']
# FROM node:14.18.1
FROM node:16.15.0
#app directory
WORKDIR /usr/src/app
#install app dependencies
COPY  package*.json ./

#for production
RUN npm ci --only=production

#bundle app source
COPY . .

EXPOSE 3500

CMD ['bash']
#SHELL ["/bin/bash", "-c"]
ENTRYPOINT  ["node", "server.js"]
