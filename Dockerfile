FROM  node:18-alpine AS builder
WORKDIR /fe-react
COPY package*.json /fe-react
RUN npm install
COPY . /fe-react
RUN npm run build
FROM nginx:alpine
COPY --from=builder /fe-react/build /usr/share/nginx/html
EXPOSE 3000