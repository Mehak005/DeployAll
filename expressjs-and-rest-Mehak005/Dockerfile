FROM node:18-slim
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy app source\ COPY . .

# Expose API port
EXPOSE 3000
CMD ["node", "index.js"]