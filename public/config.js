console.log("Setter nødvendige variabler for å kunne kjøre lokalt")
window.env = {}
// Kjøring lokalt med mock i app
window.env.DITTNAV_API_URL="http://localhost:1234/dittnav-api"
// Kjøring lokalt med backend kjørende lokalt
//window.env.DITTNAV_API_URL="http://localhost:8091/person/dittnav-api"
window.env.TJENESTER_URL="http://localhost:9222"
window.env.NAVNO_URL="http://localhost:9002"
window.env.LOGIN_URL="http://localhost:5000"
window.env.LOGIN_LEVEL_4_URL="http://localhost:5000"
window.env.VTA_URL="http://127.0.0.1:3002"
window.env.ARBEIDSSOKERREGISTRERING_URL="http://localhost:9222/veiledearbeidssoker/mistet-jobben/registrering"
window.env.AKTIVITETSPLAN_URL="http://localhost:9002/aktivitetsplan"
window.env.VEILEDERARBEIDSSOKER_URL="http://localhost:3001/start"
window.env.EVENT_TEST_PRODUCER_URL="http://localhost:1234/dittnav-event-test-producer"
window.env.ER_DEV="true"
window.env.TEST_SIDE_FEATURE_TOGGLE="true"
window.env.INNLOGGINGSSTATUS_URL="http://localhost:1234/innloggingsstatus"
window.env.TIDSLINJE_URL="http://localhost:1234/tidslinje-api"
window.env.TIDSLINJE_PRODUSENT="***"
