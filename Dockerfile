FROM node:19-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:19-alpine AS deploy

WORKDIR /app
COPY --from=build /app/build build
COPY --from=build /app/static static
COPY --from=build /app/data data
COPY --from=build /app/package*.json ./

COPY --from=build /app/prisma prisma
COPY --from=build /app/.env .
RUN npm install --omit=dev
RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "start"]