# Use a Node.js base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port on which the Node.js application will run
EXPOSE 3000

# Start the Node.js application
CMD [ "npm", "start" ]