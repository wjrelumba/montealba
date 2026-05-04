# Stage 1: Base, run installations for dependencies
FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

# Development image
FROM base AS dev
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]


# Build stage
FROM base AS build
COPY . ./
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]