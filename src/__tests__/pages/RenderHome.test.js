import React from 'react';
import ReactDOM from 'react-dom';
import RenderHome from 'js/pages/Home/RenderHome';
import ShallowRenderer from 'react-test-renderer/shallow';
import wrapIntl from 'js/IntlTestHelper';
import BeskjedStoreProvider from '../../js/context/BeskjedStoreProvider';
const ReactTestRenderer = require('react-test-renderer');

/* eslint-disable no-unused-vars */
const mockApi = () => (
  {
    fetchBeskjeder: () => new Promise((resolve, reject) => {}),
    fetchOppgaver: () => new Promise((resolve, reject) => {}),
    fetchInnbokser: () => new Promise((resolve, reject) => {}),
    fetchInaktiveBeskjeder: () => new Promise((resolve, reject) => {}),
    fetchInaktiveOppgaver: () => new Promise((resolve, reject) => {}),
    fetchInaktiveInnbokser: () => new Promise((resolve, reject) => {}),
    fetchInnlogging: () => new Promise((resolve, reject) => {}),
    fetchOppfolging: () => new Promise((resolve, reject) => {}),
    fetchMeldekort: () => new Promise((resolve, reject) => {}),
    fetchPersonNavn: () => new Promise((resolve, reject) => {}),
    fetchPersonIdent: () => new Promise((resolve, reject) => {}),
    fetchSaker: () => new Promise((resolve, reject) => {}),
    fetchMeldinger: () => new Promise((resolve, reject) => {}),
    fetchSakstema: () => new Promise((resolve, reject) => {}),
    fetchHendelser: () => new Promise((resolve, reject) => {}),
  }
);
/* eslint-enable no-unused-vars */

const flushPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(
    <BeskjedStoreProvider>
      <RenderHome api={mockApi()} />
    </BeskjedStoreProvider>,
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Login page rendering', () => {
  const api = mockApi();
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider>
      <RenderHome api={api} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

it('expect Oppfolging fetching', async () => {
  const api = mockApi();
  api.fetchOppfolging = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      {
        erBrukerUnderOppfolging: false,
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<RenderHome api={api} />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect MeldekortInfo fetching', async () => {
  const api = mockApi();
  api.fetchMeldekort = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      {
        etterregistrerteMeldekort: 0,
        meldekortbruker: true,
        nyeMeldekort: {
          antallNyeMeldekort: 3,
          nesteInnsendingAvMeldekort: null,
          nesteMeldekort: {
            fra: '2019-09-09',
            kanSendesFra: '2019-09-21',
            risikererTrekk: true,
            sisteDatoForTrekk: '2019-09-30',
            til: '2019-09-22',
            uke: '37-38',
          },
        },
        resterendeFeriedager: 0,
      },
    );
  });

  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<RenderHome api={api} />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect Personalia navn fetching', async () => {
  const api = mockApi();
  api.fetchPersonNavn = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      {
        navn: 'VINAYAGUM-MASK AMIZIC',
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<RenderHome api={api} />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});

it('expect Personalia ident fetching', async () => {
  const api = mockApi();
  api.fetchPersonIdent = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      {
        ident: 123,
      },
    );
  });
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<RenderHome api={api} />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});


it('expect PaabegynteSoknader fetching', async () => {
  const api = mockApi();

  api.fetchSaker = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      {
        url: 'https://tjenester-t6.nav.no/',
        antallPaabegynte: 2,
        feilendeBaksystem: ['hello'],
      },
    );
  });

  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<RenderHome api={api} />));
  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});
