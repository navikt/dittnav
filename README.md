[![CircleCI](https://circleci.com/gh/navikt/dittnav.svg?style=svg&circle-token=60a12a3cc1d5d27a5437e96faada24d80302442b)](https://circleci.com/gh/navikt/dittnav)
[![Maintainability](https://api.codeclimate.com/v1/badges/2cd3e2506b5064d4339c/maintainability)](https://codeclimate.com/github/navikt/dittnav/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2cd3e2506b5064d4339c/test_coverage)](https://codeclimate.com/github/navikt/dittnav/test_coverage)


# Ditt nav

Kildekoden til frontend-appen for ny ditt nav.

# Komme i gang

For å kjøre opp app-en i dev:

1. `npm install`
2. `npm run start`
3. Last ned fake login server: `cd ../ && git clone https://github.com/navikt/din-fake-login-service`
4. `cd ditt-fake-login-service`
5. `npm install`
6. terminal 1: `npm run start-mock-server`
7. terminal 8: `npm run start-proxy`
8. gå til `http://localhost:9898/`

For å gå mot lokalt kjørende backend:

1. Kommenter ut URL-en til fake login server, og inn URL-en til backend, i `.env.development`
2. `npm run start` 

For å kjøre tester:

1. `npm install`
2. `npm run test-watch`

Bygge for prod:

1. `npm install`
2. `npm run build`


# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
