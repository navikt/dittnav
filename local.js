const jsdom = require('jsdom');
const path = require('path');
const { JSDOM } = jsdom;
const eproxy = require('express-http-proxy');

const Bundler = require('parcel-bundler');
const app = require('express')();
const proxy = require('express')();
const cors = require('cors');

const getDecorator = require('./decorator.js');
const file = 'public/index.html'; // Pass an absolute path to the entrypoint here
const options = {}; // See options section of api docs, for the possibilities

// Initialize a new bundler using a file and options
const bundler = new Bundler(file, options);

// Let express use the bundler middleware, this will let Parcel handle every request over your express server

app.use(cors({ origin: 'http://localhost:9002', credentials: true}));
app.get('/dittnav-legacy-api/oppfolging', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/oppfolging.json')));
app.get('/dittnav-legacy-api/meldekortinfo', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/meldekortinfo.json')));
app.get('/dittnav-legacy-api/personalia/navn', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/person-navn.json')));
app.get('/dittnav-legacy-api/personalia/ident', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/person-ident.json')));
app.get('/dittnav-legacy-api/saker/paabegynte', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/paabegynte.json')));
app.get('/dittnav-legacy-api/meldinger/ubehandlede', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/ubehandlede.json')));
app.get('/dittnav-legacy-api/saker/sakstema', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/sakstema.json')));

app.get('/dittnav-api/oppfolging', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/oppfolging.json')));
app.get('/dittnav-api/meldekortinfo', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/meldekortinfo.json')));
app.get('/dittnav-api/personalia/navn', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/person-navn.json')));
app.get('/dittnav-api/personalia/ident', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/person-ident.json')));
app.get('/dittnav-api/saker/paabegynte', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/paabegynte.json')));
app.get('/dittnav-api/meldinger/ubehandlede', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/ubehandlede.json')));
app.get('/dittnav-api/saker/sakstema', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/sakstema.json')));
app.get('/dittnav-api/brukernotifikasjoner', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/events.json')));

app.get('/person/dittnav/api/feature', (req, res) => res.sendFile(path.resolve(__dirname, './mock-data/unleash.json')));

app.post('/dittnav-event-test-producer/produce/beskjed', (req, res) => res.send('Done-eventer er produsert for alle identen: {ident} sine brukernotifikasjoner.'));
app.post('/dittnav-event-test-producer/produce/oppgave', (req, res) => res.send('Et oppgave-event for identen: $userIdent har blitt lagt på kafka.'));
app.post('/dittnav-event-test-producer/produce/innboks', (req, res) => res.send('Et innboks-event for identen: $userIdent har blitt lagt på kafka.'));
app.post('/dittnav-event-test-producer/produce/done/all', (req, res) => res.send('Done-eventer er produsert for alle identen: {ident} sine brukernotifikasjoner.'));
app.post('/dittnav-event-test-producer/produce/done', (req, res) => res.send('Done-event er produsert for identen: $userIdent sitt event med eventID: {doneDto.eventId}.'));

app.use(bundler.middleware());

// Listen on port 1234
const PORT = 1234;

const shimproxy = () => {
  getDecorator()
    .then((fragments) => {
      proxy.use('/', eproxy(`http://localhost:${PORT}`, {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
          return Promise.resolve()
            .then(function() {
              if (proxyRes.headers['content-type'] && proxyRes.headers['content-type'].indexOf('text/html') > -1) {
                const originalData = proxyResData.toString();
                const { document } = new JSDOM(originalData).window;
                document.head.appendChild(fragments.scripts);
                document.head.appendChild(fragments.styles);
                document.head.appendChild(fragments.megamenu);

                document.body.insertBefore(fragments.skiplinks, document.body.firstChild);
                document.body.insertBefore(fragments.header, document.body.firstChild);
                document.body.appendChild(fragments.footer);
                return document.documentElement.outerHTML;
              }
              return proxyResData;
            });
        }
      }));

      proxy.listen(process.env.PORT, () => {
        console.log(`Proxying on port: ${process.env.PORT}`);
      });
    }, error => console.log(`Failed to render app ${error}`));
};

shimproxy();
app.listen(1234);
