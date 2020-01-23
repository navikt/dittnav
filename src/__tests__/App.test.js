import React from 'react';
import ReactDOM from 'react-dom';
import App from 'js/App';

const ReactTestRenderer = require('react-test-renderer');
import ShallowRenderer from 'react-test-renderer/shallow';
import wrapIntl from 'js/IntlTestHelper';

const mockApi = () => {
  return {
    fetchOppfolging: () => new Promise((resolve, reject) => {}),
    fetchMeldekort: () => new Promise((resolve, reject) => {}),
    fetchPersonNavn: () => new Promise((resolve, reject) => {}),
    fetchPersonIdent: () => new Promise((resolve, reject) => {}),
    fetchSaker: () => new Promise((resolve, reject) => {}),
    fetchMeldinger: () => new Promise((resolve, reject) => {}),
    fetchSakstema: () => new Promise((resolve, reject) => {}),
    fetchOppfolgingNyKilde: () => new Promise((resolve, reject) => {}),
    fetchMeldekortNyKilde: () => new Promise((resolve, reject) => {}),
    fetchPersonNavnNyKilde: () => new Promise((resolve, reject) => {}),
    fetchPersonIdentNyKilde: () => new Promise((resolve, reject) => {}),
    fetchSakerNyKilde: () => new Promise((resolve, reject) => {}),
    fetchMeldingerNyKilde: () => new Promise((resolve, reject) => {}),
    fetchSakstemaNyKilde: () => new Promise((resolve, reject) => {}),
  };
};

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<App api={mockApi()}/>), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Login page rendering', () => {
  const api = mockApi();
  const component = ReactTestRenderer.create(wrapIntl(<App api={api} />));
  expect(component.toJSON()).toMatchSnapshot();
});

/* Temp while feature toggling <Hendelser> in <Infomeldinger>.
it('expect Oppfolging fetching', async () => {
  const api = mockApi();
  api.fetchOppfolging = () => new Promise((resolve, reject) => {
    resolve(
      {
        'erBrukerUnderOppfolging': false
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api}/>));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect MeldekortInfo fetching', async () => {
  const api = mockApi();
  api.fetchMeldekort = () => new Promise((resolve, reject) => {
    resolve(
      {
        'etterregistrerteMeldekort': 0,
        'meldekortbruker': true,
        'nyeMeldekort': {
          'antallNyeMeldekort': 3,
          'nesteInnsendingAvMeldekort': null,
          'nesteMeldekort': {
            'fra': '2019-09-09',
            'kanSendesFra': '2019-09-21',
            'risikererTrekk': true,
            'sisteDatoForTrekk': '2019-09-30',
            'til': '2019-09-22',
            'uke': '37-38'
          }
        },
        'resterendeFeriedager': 0
      }
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api}/>));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect Personalia navn fetching', async () => {
  const api = mockApi();
  api.fetchPersonNavn = () => new Promise((resolve, reject) => {
    resolve(
      {
        'navn': 'VINAYAGUM-MASK AMIZIC'
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api}/>));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect Personalia ident fetching', async () => {
  const api = mockApi();
  api.fetchPersonIdent = () => new Promise((resolve, reject) => {
    resolve(
      {
        'ident': 123
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api}/>));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});


it('expect PaabegynteSoknader fetching', async () => {
  const api = mockApi();

  api.fetchSaker = () => new Promise((resolve, reject) => {
    resolve(
      {
        'url': 'https://tjenester-t6.nav.no/',
        'antallPaabegynte': 2,
        'feilendeBaksystem': ['hello']
      }
    );
  });

  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<App api={api}/>));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});
 */
