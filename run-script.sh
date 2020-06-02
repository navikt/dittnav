#!/bin/bash

if [[ -z "$DITTNAV_API_URL" ]] ||
  [[ -z "$TJENESTER_URL" ]] ||
  [[ -z "$NAVNO_URL" ]] ||
  [[ -z "$LOGIN_URL" ]] ||
  [[ -z "$VTA_URL" ]] ||
  [[ -z "$INNLOGGINGSLINJE_API_URL" ]] ||
  [[ -z "$ARBEIDSSOKERREGISTRERING_URL" ]] ||
  [[ -z "$VARSLINGER_FEATURE_TOGGLE" ]] ||
  [[ -z "$TEST_SIDE_FEATURE_TOGGLE" ]]; then
  echo "For å kunne starte applikasjonen må variablene DITTNAV_API_URL, TJENESTER_URL,
  NAVNO_URL, LOGIN_URL, VTA_URL, INNLOGGINGSLINJE_API_URL, ARBEIDSSOKERREGISTRERING_URL,
  VARSLINGER_FEATURE_TOGGLE og TEST_SIDE_FEATURE_TOGGLE være satt."
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
echo "* DITTNAV_API_URL"
echo "* TJENESTER_URL"
echo "* NAVNO_URL"
echo "* LOGIN_URL"
echo "* VTA_URL"
echo "* INNLOGGINGSLINJE_API_URL"
echo "* ARBEIDSSOKERREGISTRERING_URL"
echo "* EVENT_TEST_PRODUCER_URL"
echo "* VARSLINGER_FEATURE_TOGGLE"
echo "* TEST_SIDE_FEATURE_TOGGLE"

echo "window.env={};" > /app/config.js
echo "window.env.DITTNAV_API_URL=\"$DITTNAV_API_URL\";" >> /app/config.js
echo "window.env.TJENESTER_URL=\"$TJENESTER_URL\";" >> /app/config.js
echo "window.env.NAVNO_URL=\"$NAVNO_URL\";" >> /app/config.js
echo "window.env.LOGIN_URL=\"$LOGIN_URL\";" >> /app/config.js
echo "window.env.LOGIN_LEVEL_4_URL=\"$LOGIN_LEVEL_4_URL\";" >> /app/config.js
echo "window.env.VTA_URL=\"$VTA_URL\";" >> /app/config.js
echo "window.env.INNLOGGINGSLINJE_API_URL=\"$INNLOGGINGSLINJE_API_URL\";" >> /app/config.js
echo "window.env.ARBEIDSSOKERREGISTRERING_URL=\"$ARBEIDSSOKERREGISTRERING_URL\";" >> /app/config.js
echo "window.env.VEILEDERARBEIDSSOKER_URL=\"$VEILEDERARBEIDSSOKER_URL\";" >> /app/config.js
echo "window.env.AKTIVITETSPLAN_URL=\"$AKTIVITETSPLAN_URL\";" >> /app/config.js
echo "window.env.EVENT_TEST_PRODUCER_URL=\"$EVENT_TEST_PRODUCER_URL\";" >> /app/config.js
# Midlertidig frem til feature-toggles pr namespace/miljø fungerer med pus-dekoratør og naiserator.
echo "window.env.VARSLINGER_FEATURE_TOGGLE=\"$VARSLINGER_FEATURE_TOGGLE\";" >> /app/config.js
echo "window.env.TEST_SIDE_FEATURE_TOGGLE=\"$TEST_SIDE_FEATURE_TOGGLE\";" >> /app/config.js

/run.sh
