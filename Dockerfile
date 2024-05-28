# Step 1: Build the Angular application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Angular application
RUN npm run build -- --output-path=dist

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the built Angular application from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the default Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
