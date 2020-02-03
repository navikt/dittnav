#!/bin/bash

if test -d /var/run/secrets/nais.io/vault;
then
    for FILE in /var/run/secrets/nais.io/vault/*.env
    do
        _oldIFS=$IFS
        IFS='
'
        for line in $(cat "$FILE"); do
            _key=${line%%=*}
            _val=${line#*=}

            if test "$_key" != "$line"
            then
                echo "- exporting $_key"
            else
                echo "- (warn) exporting contents of $FILE which is not formatted as KEY=VALUE"
            fi

            export "$_key"="$(echo "$_val"|sed -e "s/^['\"]//" -e "s/['\"]$//")"
        done
        IFS=$_oldIFS
    done
fi

echo $DITTNAV_LEGACY_API_URL;
echo $DITTNAV_API_URL;
echo $TJENESTER_URL;
echo $NAVNO_URL;
echo $LOGIN_URL;
echo $VTA_URL;
echo $INNLOGGINGSLINJE_API_URL;
echo $ARBEIDSSOKERREGISTRERING_URL;

if [[ -z "$DITTNAV_LEGACY_API_URL" ]] ||
  [[ -z "$DITTNAV_API_URL" ]] ||
  [[ -z "$TJENESTER_URL" ]] ||
  [[ -z "$NAVNO_URL" ]] ||
  [[ -z "$LOGIN_URL" ]] ||
  [[ -z "$VTA_URL" ]] ||
  [[ -z "$INNLOGGINGSLINJE_API_URL" ]] ||
  [[ -z "$ARBEIDSSOKERREGISTRERING_URL" ]]; then
  echo "For å kunne starte applikasjonen må variablene DITTNAV_LEGACY_API_URL, DITTNAV_API_URL, TJENESTER_URL,
  NAVNO_URL, LOGIN_URL, VTA_URL, INNLOGGINGSLINJE_API_URL og ARBEIDSSOKERREGISTRERING_URL være satt."
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
echo "* DITTNAV_LEGACY_API_URL"
echo "* DITTNAV_API_URL"
echo "* TJENESTER_URL"
echo "* NAVNO_URL"
echo "* LOGIN_URL"
echo "* VTA_URL"
echo "* INNLOGGINGSLINJE_API_URL"
echo "* ARBEIDSSOKERREGISTRERING_URL"

echo "window.env={};" > /app/config.js
echo "window.env.DITTNAV_LEGACY_API_URL=\"$DITTNAV_LEGACY_API_URL\";" >> /app/config.js
echo "window.env.DITTNAV_API_URL=\"$DITTNAV_API_URL\";" >> /app/config.js
echo "window.env.TJENESTER_URL=\"$TJENESTER_URL\";" >> /app/config.js
echo "window.env.NAVNO_URL=\"$NAVNO_URL\";" >> /app/config.js
echo "window.env.LOGIN_URL=\"$LOGIN_URL\";" >> /app/config.js
echo "window.env.VTA_URL=\"$VTA_URL\";" >> /app/config.js
echo "window.env.INNLOGGINGSLINJE_API_URL=\"$INNLOGGINGSLINJE_API_URL\";" >> /app/config.js
echo "window.env.ARBEIDSSOKERREGISTRERING_URL=\"$ARBEIDSSOKERREGISTRERING_URL\";" >> /app/config.js

/run.sh
