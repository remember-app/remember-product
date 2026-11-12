FROM node:22-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY src ./src
COPY media ./media
EXPOSE 8080
CMD ["npx", "tsx", "src/server.ts"]
