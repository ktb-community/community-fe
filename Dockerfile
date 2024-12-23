FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
ADD . .
RUN yarn build

FROM nginx:latest
WORKDIR /app
COPY --from=builder app/dist/. /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
