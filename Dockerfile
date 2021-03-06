FROM navikt/common:0.1 AS navikt-common
FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator

ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=person/dittnav
ENV FOOTER_TYPE=WITH_ALPHABET
ENV DISABLE_UNLEASH=true

COPY ./dist /app
ADD decorator.yaml /decorator.yaml

COPY --from=navikt-common /init-scripts /init-scripts
COPY --from=navikt-common /entrypoint.sh /entrypoint.sh
COPY --from=navikt-common /dumb-init /dumb-init

COPY run-script.sh /run-script.sh

RUN chmod +x /entrypoint.sh /run-script.sh

# Entrypoint-scriptet kopieres fra NAVs baseimage. Dette sørger for at init-scripts blir kjørt for å sette env-variablene som hentes fra Vault.
# Videre leter scriptet etter en fil med navn run-script.sh, og sørger for at den blir kjørt. Den filen ligger lokalt i appen.
ENTRYPOINT ["/dumb-init", "--", "/entrypoint.sh"]
