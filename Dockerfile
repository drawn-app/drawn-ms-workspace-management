FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lockb bun.lockb
COPY prisma/schema.prisma prisma/schema.prisma

RUN bun install

RUN bunx prisma generate

COPY ./src ./src

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

FROM node:23-bullseye AS prod

WORKDIR /app

COPY --from=build /app/server /app/server
COPY --from=build /app/node_modules/.prisma/client /app/node_modules/.prisma/client
COPY --from=build /app/prisma/schema.prisma /app/prisma/schema.prisma

RUN npm install prisma --save-dev

CMD ["/app/server"]

EXPOSE 3000
