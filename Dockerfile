FROM node:18.14.0 as development
WORKDIR /app
COPY package*.json ./

RUN yarn install
COPY . .
RUN ls -lha
RUN yarn build

USER node

FROM node:18-alpine as production
WORKDIR /app

ARG NODE_ENV=production

COPY package*.json ./

RUN npm install --only=production

COPY --chown=node:node --from=development /app/dist ./dist
COPY --chown=node:node ./tsconfig* ./

USER node

CMD [ "npm", "run", "start:prod" ]