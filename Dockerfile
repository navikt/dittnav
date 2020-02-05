FROM navikt/common:0.1 AS navikt-common
FROM navikt/pus-decorator

ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=person/dittnav
ENV FOOTER_TYPE=WITH_ALPHABET

COPY ./dist /app
ADD decorator.yaml /decorator.yaml

COPY --from=navikt-common /init-scripts /init-scripts
COPY --from=navikt-common /entrypoint.sh /entrypoint.sh
COPY --from=navikt-common /dumb-init /dumb-init

COPY run-script.sh /run-script.sh

RUN chmod +x /entrypoint.sh /run-script.sh

ENTRYPOINT ["/dumb-init", "--", "/entrypoint.sh"]
