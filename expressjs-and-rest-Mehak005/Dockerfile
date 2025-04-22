# Use Debian‑slim so native modules load correctly
FROM node:18-slim

WORKDIR /app

# Copy package definitions & install cleanly
COPY package*.json ./
RUN npm ci

# Copy app sources
COPY . .

# Expose your API port
EXPOSE 3000

# Start your server
CMD ["node", "index.js"]
