# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the app (prisma migrate is handled in docker-compose)
CMD ["npm", "run", "start"]