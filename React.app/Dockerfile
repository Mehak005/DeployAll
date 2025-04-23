################################
# 1) Build stage
################################
FROM node:18-bullseye-slim AS builder
WORKDIR /app

# 1.1 Copy package manifests and install deps
COPY package.json package-lock.json ./
RUN npm install

# 1.2 Copy the rest of your source
COPY . .

# 1.3 Make sure react-scripts is executable
RUN chmod +x node_modules/.bin/react-scripts

# 1.4 Build your React app
RUN npm run build

################################
# 2) Production stage
################################
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
