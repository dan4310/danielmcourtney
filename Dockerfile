FROM node:19-alpine3.15 AS build

WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

FROM node:19-alpine3.15 AS deploy-node

WORKDIR /app
COPY --from=build /app/package.json .
COPY --from=build /app/build build
COPY --from=build /app/data data
COPY --from=build /app/static static
EXPOSE 3000
CMD ["npm", "run", "start"]