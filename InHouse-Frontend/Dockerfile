FROM node:19.6-bullseye-slim AS base

# Specify working directory other than /
WORKDIR /app

# Copy only files required to install
# dependencies (better layer caching)
COPY package*.json ./

FROM base as dev

RUN --mount=type=cache,target=/usr/src/app/.npm \
  npm set cache /usr/src/app/.npm && \
  npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
