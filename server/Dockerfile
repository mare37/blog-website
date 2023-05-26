FROM node:18.12.1
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3001
CMD ["npm", "run", "start"]