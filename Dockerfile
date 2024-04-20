# Use an official Node.js image as a base
FROM node

# Set the working directory in the container
WORKDIR /backend/reactfile/src

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
