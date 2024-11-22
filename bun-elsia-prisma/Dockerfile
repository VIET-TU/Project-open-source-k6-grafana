FROM oven/bun:latest
WORKDIR /app

COPY package.json .
COPY bun.lockb .

COPY tsconfig.json .
COPY prisma prisma
COPY src src

RUN bun install --frozen-lockfile --production

ENV NODE_ENV production

RUN bunx prisma generate

EXPOSE 3000

CMD ["bun", "src/index.ts"]