# Use the official Node.js image from Docker Hub
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on (change if your app uses a different port)
EXPOSE 8081

# Command to run the app
CMD [ "node", "server.js" ]
