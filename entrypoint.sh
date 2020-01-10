#!/bin/bash

if [[ -z "$REDIRECT_URL" ]] || [[ -z "$AUTO_REDIRECT_TO_FRONTEND" ]] ; then
  echo "For å kunne starte applikasjonen må miljøvariablene REDIRECT_URL og AUTO_REDIRECT_TO_FRONTEND være satt."
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
echo "* REDIRECT_URL"
echo "* AUTO_REDIRECT_TO_FRONTEND"

echo "window.env={};" > /app/build/config.js
echo "window.env.REDIRECT_URL=\"$REDIRECT_URL\";" >> /app/build/config.js
echo "window.env.AUTO_REDIRECT_TO_FRONTEND=\"$AUTO_REDIRECT_TO_FRONTEND\";" >> /app/build/config.js

echo "Starter frontend-en"
serve -s build
