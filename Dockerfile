FROM node:carbon

WORKDIR /usr/src/dittnav

COPY ./src ./src
COPY ./config ./config
COPY ./public ./public
COPY ./scripts ./scripts
COPY ./src ./src
COPY ./.env ./.env
COPY ./.eslintignore ./.eslintignore
COPY ./.eslintrc ./.eslintrc
COPY ./package-lock.json ./package-lock.json
COPY ./package.json ./package.json
COPY ./server.js ./server.js

RUN npm install && npm run build

EXPOSE 8080

CMD ["npm", "run", "server"]
#CMD ["bash"]