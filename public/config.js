console.log("Setter nødvendige variabler for å kunne kjøre lokalt")
window.env = {}
// Kjøring lokalt med mock i app
window.env.DITTNAV_BASEAPI_URL="http://localhost:1234"
// Kjøring lokalt med backend kjørende lokalt
//window.env.DITTNAV_BASEAPI_URL="http://localhost:8090/person"
window.env.TJENESTER_URL="http://localhost:9222"
window.env.NAVNO_URL="http://localhost:9222"
window.env.LOGIN_URL="http://localhost:5000"
window.env.VTA_URL="http://127.0.0.1:3002"
window.env.REGISTRERING_URL="http://localhost:9222/veiledearbeidssoker/mistet-jobben/registrering"
window.env.ER_DEV="true"
