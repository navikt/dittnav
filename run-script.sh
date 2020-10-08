#!/bin/bash

declare -A variables=(
  [TJENESTER_URL]=$TJENESTER_URL
  [NAVNO_URL]=$NAVNO_URL
  [VTA_URL]=$VTA_URL
  [INNLOGGINGSLINJE_API_URL]=$INNLOGGINGSLINJE_API_URL
  [ARBEIDSSOKERREGISTRERING_URL]=$ARBEIDSSOKERREGISTRERING_URL
  [AKTIVITETSPLAN_URL]=$AKTIVITETSPLAN_URL
  [TEST_SIDE_FEATURE_TOGGLE]=$TEST_SIDE_FEATURE_TOGGLE
  [SYKDOM_I_FAMILIEN_URL]=$SYKDOM_I_FAMILIEN_URL
)

checkAvailableEnvVariables () {
  for variable in "${!variables[@]}"
  do
    if [[ -z ${variables[$variable]} ]]; then
      echo "For å kunne starte applikasjonen må ${variable} være satt."
      echo "Avbryter oppstart."
      exit 1
    fi
  done
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
  echo "Tilgjengeliggjør følgende miljøvariabler for frontend-en:"
  for variable in "${!variables[@]}"
  do
    echo "* $variable"
  done
}

makeEnvVariablesAvailable() {
  echo "window.env={};" > /app/config.js
  for variable in "${!variables[@]}"
  do
    echo "window.env.${variable}=\"${variables[$variable]}\";" >> /app/config.js
  done
}

checkAvailableEnvVariables
checkTestConfigFile
printAvailability
makeEnvVariablesAvailable

/run.sh
