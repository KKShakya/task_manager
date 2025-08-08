
# Use official Node.js image as base
FROM node:18

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the backend source code
COPY . .

# Expose port your app listens to (change 5000 if different)
EXPOSE 4000

# Command to run your app
CMD ["node", "server.js"]
