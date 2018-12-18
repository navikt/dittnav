# Generelt

Appen configureres med `.env`
`.env.development` kan brukes hvis den kjøres lokalt (krever at man har `NODE_ENV=development` path variable satt opp)

# Path variables

## Det som arves fra `frontshell` [se her](https://github.com/navikt/frontshell/blob/master/doc/path-variables.md)
```
  APPRES_CMS_URL=http://appres.nav.no
  FRONTSHELL_SETTINGS_PATH=config/env.json
  FRONTSHELL_SETTINGS_NAME=dittnavSettings
```

## Resten
```
  DITTNAV_API_URL=/dittnav-api/rest
  REG_STATUS_LINK=https://nav.no/sbl
  SERVICES_URL=https://tjenester-t10.nav.no

  # denne brukes for utvikling
  NODE_PATH=src/
```