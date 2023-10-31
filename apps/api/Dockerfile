# Create a base image
FROM node:18-alpine3.16 AS base
ENV WORKDIR=/app/

# =================================================================

FROM base AS builder

WORKDIR ${WORKDIR}

RUN yarn global add turbo
COPY . . 

# Create a pruned version of the lockfile
RUN turbo prune api --docker

# =================================================================

FROM base AS installer

WORKDIR ${WORKDIR}

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# RUN yarn turbo run build --filter=api...

# =================================================================

FROM installer AS development

WORKDIR ${WORKDIR}

COPY --from=installer /app .

WORKDIR ${WORKDIR}/apps/api/

# Postgres Information
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD
ARG POSTGRES_DB
ARG POSTGRES_CONTAINER
ARG POSTGRES_PORT

# Define environmental variables
ENV POSTGRES_USER=$POSTGRES_USER
ENV POSTGRES_PASSWORD=$POSTGRES_PASSWORD
ENV POSTGRES_CONTAINER=$POSTGRES_CONTAINER
ENV POSTGRES_DB=$POSTGRES_DB
ENV POSTGRES_PORT=$POSTGRES_PORT

# Create variable for database url
ENV DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_CONTAINER}:${POSTGRES_PORT}/${POSTGRES_DB}

CMD source setup.dev.sh

# =================================================================

FROM installer AS production

