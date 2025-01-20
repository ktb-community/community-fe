FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ARG VITE_BASE_URL
ENV VITE_BASE_URL=$VITE_BASE_URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
ARG VITE_STORAGE_URL
ENV VITE_STORAGE_URL=$VITE_STORAGE_URL
ARG VITE_LOGO_TEXT
ENV VITE_LOGO_TEXT=$VITE_LOGO_TEXT
ARG VITE_SITE_DESCRIPTION
ENV VITE_SITE_DESCRIPTION=$VITE_SITE_DESCRIPTION
RUN yarn build

FROM nginx:latest
WORKDIR /app
RUN apt-get update && apt-get install -y tzdata && \
    apt-get clean && rm -rf /var/lib/apt/lists/* && \
    ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
ENV TZ=Asia/Seoul
COPY --from=builder app/dist/. /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
