FROM node:10-alpine as builder
COPY . ./GipherUI
WORKDIR /GipherUI
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.14.1-alpine
COPY --from=builder /GipherUI/dist/GipherUI/ /usr/share/nginx/html