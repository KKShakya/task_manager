# Use official Node.js Debian-based image
FROM node:18-bullseye

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app code
COPY . .

# Build the Next.js app
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start Next.js server
CMD ["npm", "start"]
