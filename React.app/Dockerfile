################################
# 1) Build stage
################################
FROM node:18-bullseye-slim AS builder
WORKDIR /app

# Copy package manifests & install deps
COPY package.json package-lock.json ./
RUN npm install

# Copy app source & build
COPY . .
RUN chmod +x node_modules/.bin/react-scripts
RUN npm run build

################################
# 2) Production stage
################################
FROM nginx:stable-alpine

# Copy custom nginx.conf for reverse proxy
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the compiled React static files
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]