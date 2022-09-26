

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install
# RUN apt-get update && apt-get install sudo -y 
# RUN npm run build

COPY . .

ENV PORT=5173

EXPOSE 5173

CMD [ "npm", "start"]
# RUN npm run start