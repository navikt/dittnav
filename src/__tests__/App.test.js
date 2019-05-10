import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';
const ReactTestRenderer = require('react-test-renderer');
import ShallowRenderer from 'react-test-renderer/shallow';
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => {
  return {
    fetchPersonInfoAndServices: () => new Promise((resolve, reject) => {}),
    fetchPaabegynteSoknader: () => new Promise((resolve, reject) => {}),
    fetchUbehandledeMeldinger: () => new Promise((resolve, reject) => {}),
  }
};

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<App api={mockApi()} path='/' />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Login page rendering', () => {
  const api = mockApi();
  const component = ReactTestRenderer.create(wrapIntl(<App api={api} path='/person/dittnav/login' />));
  expect(component.toJSON()).toMatchSnapshot();
});

it('expect PersonInfo fetching', async () => {
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
  renderer.render(wrapIntl(<App api={api} path='/' />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect PaabegynteSoknader fetching', async () => {
  const api = mockApi();

  api.fetchPersonInfoAndServices = () => new Promise((resolve, reject) => {
    resolve({
      "paabegynteSoknader": {
        "url": "https://tjenester-t6.nav.no/",
        "antallPaabegynte": 2,
        "feilendeBaksystem": ['hello']
      },
      "personinfo": {
        "navn": "Ola Ytelssen",
        "fgkode": "RARBS",
        "ytelse": "ATTF",
        "registrert": true,
        "inaktiv": false,
        "meldekortbruker": true,
        "erUnderRegistreringIArbeid": true
      },
      "feilendeTjenester":[]
    })
  });

  // api.fetchPaabegynteSaker = () => new Promise((resolve, reject) => {
  //   resolve({feilendeBaksystem: ['hello']});
  // });

  const component = ReactTestRenderer.create(wrapIntl(<App api={api} path='/' />));
  await flushPromises();

  expect(component.root.children[0].instance.state.errors).toEqual(['error.paabegynte']);
});

