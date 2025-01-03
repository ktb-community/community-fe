FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY . .
RUN yarn build

FROM nginx:latest
WORKDIR /app
COPY --from=builder app/dist/. /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
