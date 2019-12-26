FROM node:12-alpine3.11

COPY package.json .
RUN npm install
COPY . . 
EXPOSE 3000
CMD ["npm", "start"]