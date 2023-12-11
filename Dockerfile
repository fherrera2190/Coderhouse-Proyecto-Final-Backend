# Base image
FROM node

# Directory where the project is saved
WORKDIR /app

# Copy the package.json file
COPY package*.json ./

# Execute the command to install dependencies
RUN npm install

# Copy all the code
COPY . .

# The port to expose in our container
EXPOSE 8080

# Execute the command to start the app
CMD [ "npm", "start"]