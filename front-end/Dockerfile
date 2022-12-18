FROM node:16
WORKDIR /front-end
COPY . .
RUN yarn install
RUN yarn upgrade
RUN yarn add --dev typescript
RUN yarn add --dev @types/react
EXPOSE 3000