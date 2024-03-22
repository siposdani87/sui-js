FROM --platform=$BUILDPLATFORM node:20.10 as builder

# RUN npm install -g npm@9.4.0

# Install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

# RUN npm run build

WORKDIR /app/website

RUN npm ci
RUN npm run build

FROM nginx:1.23.3-alpine-slim as runner

ENV INSTALL_PATH /usr/share/nginx/html

WORKDIR $INSTALL_PATH

COPY default.conf /etc/nginx/conf.d
COPY --from=builder /app/website/build/ $INSTALL_PATH/

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

RUN chown -R www-data:www-data $INSTALL_PATH/*
RUN chmod -R 0755 $INSTALL_PATH/*
