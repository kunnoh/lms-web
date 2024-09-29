FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install dependencies and build the application
RUN npm ci && \
    npm run build --omit=dev && \
    # Remove source code after build
    rm *

FROM nginx:alpine-slim AS release

COPY --from=build /app/dist/lms-web/browser/ /usr/share/nginx/html/
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/lms-web.conf /etc/nginx/conf.d/lms-web.conf

EXPOSE 80