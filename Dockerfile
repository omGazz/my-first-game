# Use the node:slim base image 
FROM node:slim

# Set the working directory to /docker-sample
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

#Run npm install (inside the container ofc)
RUN npm install

# Copy the current directory contents into the container
COPY . .

USER node

# expose the port 5173
EXPOSE 5173

#run the command
CMD ["node", "main.js"]