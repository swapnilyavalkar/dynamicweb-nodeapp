# Use the smaller Node.js alpine base image
FROM node:22-alpine3.20

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for installing dependencies (take advantage of Docker caching)
COPY package*.json ./

# Install dependencies (this will install express and others)
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Start the application
CMD ["npm", "start"]