# Build stage
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV PORT=3000
ENV NODE_ENV=development
EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
