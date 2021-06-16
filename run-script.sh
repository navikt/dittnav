#!/bin/bash

declare -A variables=(
  [DITTNAV_API_URL]=$DITTNAV_API_URL
  [TJENESTER_URL]=$TJENESTER_URL
  [NAVNO_URL]=$NAVNO_URL
  [LOGIN_URL]=$LOGIN_URL
  [LOGIN_LEVEL_4_URL]=$LOGIN_LEVEL_4_URL
  [VTA_URL]=$VTA_URL
  [INNLOGGINGSSTATUS_URL]=$INNLOGGINGSSTATUS_URL
  [VEILEDERARBEIDSSOKER_URL]=$VEILEDERARBEIDSSOKER_URL
  [ARBEIDSSOKERREGISTRERING_URL]=$ARBEIDSSOKERREGISTRERING_URL
  [AKTIVITETSPLAN_URL]=$AKTIVITETSPLAN_URL
  [EVENT_TEST_PRODUCER_URL]=$EVENT_TEST_PRODUCER_URL
  [VARSLINGER_FEATURE_TOGGLE]=$VARSLINGER_FEATURE_TOGGLE
  [TEST_SIDE_FEATURE_TOGGLE]=$TEST_SIDE_FEATURE_TOGGLE
  [DINE_PLEIEPENGER_URL]=$DINE_PLEIEPENGER_URL
  [TIDSLINJE_URL]=$TIDSLINJE_URL
  [TIDSLINJE_PRODUSENT]=$TIDSLINJE_PRODUSENT
  [ER_DEV]=$ER_DEV
  [MIN_INNBOKS_URL]=$MIN_INNBOKS_URL
  [DAGPENGER_URL]=$DAGPENGER_URL
)

forEachVariable() {
  for variable in "${!variables[@]}"
    do
      ($1 $variable) || exit $?
    done
}

checkAvailability () {
  if [[ -z ${variables[$1]} ]]; then
    echo "For å kunne starte applikasjonen må ${1} være satt."
    echo "Avbryter oppstart."
    exit 1
  fi
}

checkTestConfigFile() {
  TEST_CONFIG_FILE=./public/config.js
  if test -f "${TEST_CONFIG_FILE}"; then
    echo "Warning: Test-konfig-en ${TEST_CONFIG_FILE} har feilaktig kommet med i docker-image-et."
    echo "  Sørg for at prosjektets .dockerignore-fil innholder 'public/config.js' slik at dette ikke skjer igjen."
    echo "  Sletter ${TEST_CONFIG_FILE} som ligger i image-et, slik at inneværende skript kan opprette en korrekt config.js-fil basert på miljøvariabler."
    rm ${TEST_CONFIG_FILE}
  fi
}

printAvailability () {
  echo "* ${1}"
}

makeAvailable() {
  echo "window.env.${1}=\"${variables[$1]}\";" >> /app/config.js
}

(forEachVariable checkAvailability) || exit $?
checkTestConfigFile

echo "Tilgjengeliggjør følgende miljøvariabler for frontend-en:"
forEachVariable printAvailability

echo "window.env={};" > /app/config.js
forEachVariable makeAvailable

/run.sh
