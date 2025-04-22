# Stage 1: build React
FROM node:18-alpine AS builder
WORKDIR /app

# 1) Copy package files & install dependencies
COPY package*.json ./
RUN npm install

# 2) Copy the rest of your source & build
COPY . .
RUN npm run build          # ← this produces /app/build

# Stage 2: serve the static build
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
