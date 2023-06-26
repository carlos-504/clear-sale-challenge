FROM node:16-alpine

COPY --chown=node:node package.json swagger.json tsconfig.json server.ts .env /app/
COPY --chown=node:node src/ /app/src

ENV TZ=America/Sao_Paulo

ARG PORT_API=3000
ENV PORT_API $PORT_API

ARG NODE_ENV=prod
ENV NODE_ENV $NODE_ENV

WORKDIR /app
USER node
EXPOSE $PORT_API

RUN yarn
RUN yarn build

CMD ["sh", "-c", "yarn ${NODE_ENV}"]