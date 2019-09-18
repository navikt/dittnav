FROM docker.adeo.no:5000/pus/decorator

ENV OIDC_LOGIN_URL /veilarbstepup/oidc
ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=person/dittnav
ENV FOOTER_TYPE=WITH_ALPHABET
COPY ./build /app
ADD decorator.yaml /decorator.yaml