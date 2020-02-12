# Build Stage
FROM node:12.14.0-alpine AS builder

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install
RUN yarn build

# Exec Stage
FROM node:12.14.0-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.env ./
COPY --from=builder /usr/src/app/server.js ./
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/next.config.js ./

ENV PORT=80
EXPOSE 80
CMD ["yarn", "start"]
