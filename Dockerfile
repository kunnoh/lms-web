# StageBuild the application
FROM node:22.9-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build --omit=dev && \
    rm -rf node_modules src test

# Stage 2: Serve with Nginx
FROM nginx:alpine-slim AS release

# Copy built files to Nginx HTML directory
COPY --from=build /app/dist/lms-web/browser/* /usr/share/nginx/html/

# Copy custom Nginx configuration
COPY ./nginx/lms-web.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
