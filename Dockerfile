FROM node:14
ENV NODE_ENV production

WORKDIR usr/src/app

COPY run-script.sh run-script.sh

COPY server server/
COPY dist dist/

RUN chmod +x run-script.sh
RUN ./run-script.sh

WORKDIR server
RUN npm install

CMD ["node", "./server.js"]

ENV PORT=8080
EXPOSE $PORT
