FROM docker.adeo.no:5000/pus/decorator:228.20190926.1521

ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=person/dittnav
ENV FOOTER_TYPE=WITH_ALPHABET
COPY ./build /app
ADD decorator.yaml /decorator.yaml
