FROM navikt/pus-decorator

ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=person/dittnav
ENV FOOTER_TYPE=WITH_ALPHABET
COPY ./build /app
ADD decorator.yaml /decorator.yaml
