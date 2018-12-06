FROM docker.adeo.no:5000/pus/decorator

ENV APPLICATION_NAME=dittnav
ENV CONTEXT_PATH=dittnav-nais

ENV PUBLIC_DITTNAV_API_URL=/dittnav/tjenester/person/personinfo
ENV PUBLIC_SAKSOVERSIKT_API_URL=/saksoversikt/tjenester/saker/paabegynte
ENV PUBLIC_SAKSOVERSIKT_URL=/saksoversikt
ENV PUBLIC_MIN_INNBOKS_URL=/mininnboks
ENV PUBLIC_REG_STATUS_LINK=https://nav.no/sbl/nav_security_check
ENV PUBLIC_SERVICES_URL=https://tjenester-t1.nav.no
ENV PUBLIC_CONTEXT_PATH=/dittnav-nais
ENV PUBLIC_LOGINSERVICE=/dittnav-nais/login
ENV PUBLIC_ARBEIDSGIVER_LOGIN_URL=https://www-t1.nav.no/no/Bedrift/Tjenester+og+skjemaer/NAV-+og+Altinn-tjenester


COPY ./build /app
