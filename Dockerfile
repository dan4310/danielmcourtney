FROM node:19-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:19-alpine AS deploy

WORKDIR /app
COPY --from=build /app/build build
COPY --from=build /app/static static
COPY --from=build /app/data data
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules/.prisma node_modules/.prisma
COPY --from=build /app/node_modules/@prisma node_modules/@prisma

EXPOSE 3000
CMD ["npm", "run", "start"]