import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');
import ShallowRenderer from 'react-test-renderer/shallow';
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => {
  return {
    fetchPersonInfoAndServices: () => new Promise((resolve, reject) => {}),
    fetchSaker: () => new Promise((resolve, reject) => {}),
    fetchMeldinger: () => new Promise((resolve, reject) => {}),
    fetchSakstema: () => new Promise((resolve, reject) => {}),
    useFetchEverythingForHome: () => {
      return [{ info: {}, paabegynteSoknader: null, sakstema: { antallSakstema: 0, sakstemaList: [] }, mininnboks: [], errors: [], isLoaded: true}]
    }
  }
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<App api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect PersonInfo fetching', () => {
  const api = mockApi();
  api.fetchPersonInfoAndServices = () => new Promise((resolve, reject) => {
    resolve({
      "personinfo": {
        "navn": "Ola Ytelssen",
        "fgkode": "RARBS",
        "ytelse": "ATTF",
        "registrert": true,
        "inaktiv": false,
        "meldekortbruker": true,
        "erUnderRegistreringIArbeid": true
      },
    })
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api} />));
  const component = renderer.getRenderOutput();

  expect(component).toMatchSnapshot();
});

it('expect PaabegynteSoknader fetching', () => {
  const api = mockApi();

  api.useFetchEverythingForHome = () => {
    return [{ info: {
      "navn": "Ola Ytelssen",
      "fgkode": "RARBS",
      "ytelse": "ATTF",
      "registrert": true,
      "inaktiv": false,
      "meldekortbruker": true,
      "erUnderRegistreringIArbeid": true
    }, paabegynteSoknader: {
      "url": "https://tjenester-t6.nav.no/",
      "antallPaabegynte": 2,
    }, sakstema: { antallSakstema: 0, sakstemaList: [] }, mininnboks: [], errors: ['error.baksystemer', 'error.baksystemer'], isLoaded: true}]
  }

  const component = ReactTestRenderer.create(wrapIntl(<App api={api} />));

  expect(component).toMatchSnapshot();
});

