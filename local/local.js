const jsdom = require('jsdom');
const path = require('path');
const { JSDOM } = jsdom;

// eslint-disable-next-line import/no-extraneous-dependencies
const eproxy = require('express-http-proxy');
// eslint-disable-next-line import/no-extraneous-dependencies
const app = require('express')();
// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('express')();

const Bundler = require('parcel-bundler');
const cors = require('cors');

const getDecorator = require('./decorator.js');
const file = 'public/index.html'; // Pass an absolute path to the entrypoint here
const options = {}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(file, options);

// Let express use the bundler middleware, this will let Parcel handle every request over your express server
app.use(cors({ origin: 'http://localhost:9002', credentials: true }));

app.get('/dittnav-api/oppfolging', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/oppfolging.json'))
));

app.get('/dittnav-api/meldekortinfo', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/meldekortinfo.json'))
));

app.get('/dittnav-api/navn', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/navn.json'))
));

app.get('/dittnav-api/ident', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/ident.json'))
));

app.get('/dittnav-api/saker/paabegynte', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/paabegynte.json'))
));

app.get('/dittnav-api/meldinger/ubehandlede', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/ubehandlede.json'))
));

app.get('/dittnav-api/saker', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/saker.json'))
));

app.get('/innloggingsstatus/summary', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/innloggingsstatus.json'))
));

app.get('/dittnav-api/beskjed', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/beskjed.json'))
));

app.get('/dittnav-api/oppgave', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/oppgave.json'))
));

app.get('/dittnav-api/innboks', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/innboks.json'))
));

app.get('/dittnav-api/beskjed/inaktiv', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/beskjed-inaktiv.json'))
));

app.get('/dittnav-api/oppgave/inaktiv', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/oppgave-inaktiv.json'))
));

app.get('/dittnav-api/innboks/inaktiv', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/innboks-inaktiv.json'))
));

app.get('/dittnav-api/brukernotifikasjon/count', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/count.json'))
));

app.get('/person/dittnav/api/feature', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/unleash.json'))
));

app.get('/dittnav-api/authPing', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/auth-ping.json'))
));

app.post('/dittnav-api/produce/done', (req, res) => (
  res.send('Done-event er sendt til handler for identen: {ident} sitt event med eventID: {eventId}.')
));

app.post('/dittnav-event-test-producer/produce/beskjed', (req, res) => (
  res.send('Done-eventer er produsert for alle identen: {ident} sine brukernotifikasjoner.')
));

app.post('/dittnav-event-test-producer/produce/oppgave', (req, res) => (
  res.send('Et oppgave-event for identen: $userIdent har blitt lagt på kafka.')
));

app.post('/dittnav-event-test-producer/produce/innboks', (req, res) => (
  res.send('Et innboks-event for identen: $userIdent har blitt lagt på kafka.')
));

app.post('/dittnav-event-test-producer/produce/done/all', (req, res) => (
  res.send('Done-eventer er produsert for alle identen: {ident} sine brukernotifikasjoner.')
));

app.get('/tidslinje-api/tidslinje', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/tidslinje.json'))
));

app.get('/dittnav-api/unleash/situasjon', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/unleash-situasjon.json'))
));

app.get('/person/dittnav/veientilarbeid/api/auth', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/auth-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/api/auth', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/auth-mock.json'))
));

app.get('/meldekort/meldekort-api/api/person/meldekortstatus', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/meldekort-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarboppfolging/api/niva3/underoppfolging', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/under-oppfolging-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/api/feature/', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/feature-toggles-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarboppfolging/api/oppfolging', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/oppfolging-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarbregistrering/api/registrering', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/brukerregistrering-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarbregistrering/api/registrering', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/brukerregistrering-mock.json'))
));

app.get('/meldekort/meldekort-api/api/person/meldekort', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/meldekort-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarbregistrering/api/startregistrering', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/bruker-info-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/saksoversikt-api/tjenester/sakstema', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/saksoversikt-sakstema-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/saksoversikt-api/tjenester/saker/hentPaabegynteSoknader', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/saksoversikt-pabegyntesoknader-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarbdialog/api/dialog/antallUleste', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/uleste-dialoger-mock.json'))
));

app.get('/person/dittnav/veientilarbeid/veilarbvedtakinfo/api/behovsvurdering/besvarelse', (req, res) => (
  res.sendFile(path.resolve(__dirname, './mock/vta-mocks/egenvurderingbesvarelse-mock.json'))
));

app.use(bundler.middleware());

// Listen on port 1234
const PORT = 1234;

const shimproxy = () => {
  getDecorator()
    .then((fragments) => {
      proxy.use('/', eproxy(`http://localhost:${PORT}`, {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
          return Promise.resolve()
            .then(() => {
              if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].indexOf('text/html') > -1) {
                const originalData = proxyResData.toString();
                const { document } = new JSDOM(originalData).window;
                document.head.appendChild(fragments.scripts);
                document.head.appendChild(fragments.styles);
                document.body.insertBefore(fragments.header, document.body.firstChild);
                document.body.appendChild(fragments.footer);
                return document.documentElement.outerHTML;
              }
              return proxyResData;
            });
        },
      }));

      proxy.listen(process.env.PORT, () => {
        console.log(`Proxying on port: ${process.env.PORT}`);
      });
    }, error => console.log(`Failed to render app ${error}`));
};

shimproxy();
app.listen(1234);
