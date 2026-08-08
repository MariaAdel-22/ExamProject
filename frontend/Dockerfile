FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN BROWSER_DIR="$(find dist -type d -name browser -print -quit)" \
    && test -n "$BROWSER_DIR" \
    && mkdir -p /railway-dist \
    && cp -R "$BROWSER_DIR"/. /railway-dist/

FROM caddy:alpine
WORKDIR /app
COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite
COPY --from=build /railway-dist ./dist
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]