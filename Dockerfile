FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN CI=true npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "start:docker" ]
