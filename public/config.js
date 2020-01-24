console.log("Setter nødvendige variabler for å kunne kjøre lokalt")
window.env = {}
// Kjøring lokalt med mock i app
window.env.DITTNAV_LEGACY_API_URL="http://localhost:1234/dittnav-legacy-api"
window.env.DITTNAV_API_URL="http://localhost:1234/dittnav-api"
// Kjøring lokalt med backend kjørende lokalt
//window.env.DITTNAV_LEGACY_API_URL="http://localhost:8090/person/dittnav-legacy-api"
//window.env.DITTNAV_API_URL="http://localhost:8091/person/dittnav-api"
window.env.TJENESTER_URL="http://localhost:9222"
window.env.NAVNO_URL="http://localhost:9222"
window.env.LOGIN_URL="http://localhost:5000"
window.env.VTA_URL="http://127.0.0.1:3002"
window.env.ARBEIDSSOKERREGISTRERING_URL="http://localhost:9222/veiledearbeidssoker/mistet-jobben/registrering"
window.env.EVENT_TEST_PRODUCER_URL="http://localhost:1234/dittnav-event-test-producer"
window.env.VEILEDERARBEIDSSOKER_URL="http://localhost:3001/start"
window.env.ER_DEV="true"
