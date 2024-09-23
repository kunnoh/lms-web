FROM node:22-alpine AS build

WORKDIR /app

COPY . .
RUN npm ci &&\
    npm run build --omit=dev

FROM nginx:alpine-slim AS release

COPY --from=build /app/dist/lms-web/browser/ /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/lms-web.conf /etc/nginx/sites-available/default

EXPOSE 80