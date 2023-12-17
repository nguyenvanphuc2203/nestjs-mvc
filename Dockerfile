FROM node:18-alpine
WORKDIR /usr/src/app
COPY . .
RUN npm install --force
CMD [ "npm", "run", "start" ]