#!/bin/bash

if [[ -z "$DITTNAV_BASEAPI_URL" ]] ||
  [[ -z "$TJENESTER_URL" ]] ||
  [[ -z "$NAVNO_URL" ]] ||
  [[ -z "$LOGIN_URL" ]] ||
  [[ -z "$VTA_URL" ]] ||
  [[ -z "$REGISTRERING_URL" ]]; then
  echo "For å kunne starte applikasjonen må variablene DITTNAV_BASEAPI_URL, TJENESTER_URL, NAVNO_URL, LOGIN_URL, VTA_URL og REGISTRERING_URL være satt."
  echo "Avbryter oppstart."
  exit 1
fi

TEST_CONFIG_FILE=./public/config.js
if test -f "${TEST_CONFIG_FILE}"; then
    echo "Warning: Test-konfig-en ${TEST_CONFIG_FILE} har feilaktig kommet med i docker-image-et."
    echo "  Sørg for at prosjektets .dockerignore-fil innholder 'public/config.js' slik at dette ikke skjer igjen."
    echo "  Sletter ${TEST_CONFIG_FILE} som ligger i image-et, slik at inneværende skript kan opprette en korrekt config.js-fil basert på miljøvariabler."
    rm ${TEST_CONFIG_FILE}
fi

echo "Tilgjengeliggjør følgende miljøvariabler for frontend-en:"
echo "* DITTNAV_BASEAPI_URL"
echo "* TJENESTER_URL"
echo "* NAVNO_URL"
echo "* LOGIN_URL"
echo "* VTA_URL"
echo "* REGISTRERING_URL"

echo "window.env={};" > /app/build/config.js
echo "window.env.DITTNAV_BASEAPI_URL=\"$DITTNAV_BASEAPI_URL\";" >> /app/build/config.js
echo "window.env.TJENESTER_URL=\"$TJENESTER_URL\";" >> /app/build/config.js
echo "window.env.NAVNO_URL=\"$NAVNO_URL\";" >> /app/build/config.js
echo "window.env.LOGIN_URL=\"$LOGIN_URL\";" >> /app/build/config.js
echo "window.env.VTA_URL=\"$VTA_URL\";" >> /app/build/config.js
echo "window.env.REGISTRERING_URL=\"$REGISTRERING_URL\";" >> /app/build/config.js

echo "Starter frontend-en"
serve -s build
