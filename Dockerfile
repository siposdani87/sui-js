FROM --platform=$BUILDPLATFORM node:24-slim AS builder

# Install root dependencies (needed for TypeDoc to resolve TypeScript sources)
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# Copy source files needed for website build
COPY src/ src/
COPY tsconfig.json ./

WORKDIR /app/website

COPY website/package.json website/package-lock.json ./
RUN npm ci

COPY website/ .
RUN npm run build

FROM nginx:1.27-alpine-slim AS runner

ENV INSTALL_PATH=/usr/share/nginx/html

WORKDIR $INSTALL_PATH

COPY default.conf /etc/nginx/conf.d
COPY --from=builder /app/website/build/ $INSTALL_PATH/

RUN set -x ; \
  addgroup -g 82 -S www-data ; \
  adduser -u 82 -D -S -G www-data www-data && exit 0 ; exit 1

RUN chown -R www-data:www-data $INSTALL_PATH/*
RUN chmod -R 0755 $INSTALL_PATH/*

USER www-data

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO /dev/null http://localhost/ || exit 1
