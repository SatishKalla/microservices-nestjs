# Base image
FROM node:21-slim

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the server using the build
CMD ["npm", "run", "start:dev"]