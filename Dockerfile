FROM navikt/common:0.1 AS navikt-common
FROM node:14

ENV NODE_ENV production

WORKDIR usr/src/app

COPY server server/
COPY dist dist/
COPY run-script.sh /run-script.sh

COPY --from=navikt-common /init-scripts /init-scripts
COPY --from=navikt-common /entrypoint.sh /entrypoint.sh
COPY --from=navikt-common /dumb-init /dumb-init

RUN chmod +x /run-script.sh
RUN chmod +x /entrypoint.sh
RUN chmod +x /dist/config.js

WORKDIR server
RUN npm install

ENV PORT=8080
EXPOSE $PORT

ENTRYPOINT ["/dumb-init", "--", "/entrypoint.sh"]
