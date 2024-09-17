# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json into the working directory
COPY ./package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire web app directory except for files in .dockerignore
COPY . .

# Expose the port your app runs on (e.g., 8080)
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
