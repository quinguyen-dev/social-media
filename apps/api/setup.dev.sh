#!/bin/sh

yarn prisma generate
yarn prisma migrate deploy
yarn tsx watch src/app.ts