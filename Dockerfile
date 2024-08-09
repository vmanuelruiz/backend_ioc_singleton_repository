FROM node:20.15-alpine AS node

FROM node AS base
WORKDIR /app
COPY package*.json ./

FROM base AS build
RUN npm ci --silent
COPY . .
RUN npm run build

FROM base AS dependencies
RUN npm ci --production --silent

FROM node AS final
WORKDIR /app
COPY --from=build /app ./
COPY --from=dependencies /app/node_modules ./node_modules

EXPOSE 3000
CMD npm run start:prod
