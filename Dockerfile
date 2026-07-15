FROM ghcr.io/voidzero-dev/vite-plus:latest AS build
WORKDIR /app
COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./
RUN vp install --frozen-lockfile
COPY --chown=vp:vp . .
RUN vp build

FROM node:lts-alpine AS runner
RUN npm install serve@14.2.6 -g
WORKDIR /app
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]