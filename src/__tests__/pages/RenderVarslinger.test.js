import React from 'react';
import ReactDOM from 'react-dom';
import RenderVarslinger from 'js/pages/Varslinger/RenderVarslinger';
import wrapIntl from 'js/IntlTestHelper';

const ReactTestRenderer = require('react-test-renderer');

/* eslint-disable no-unused-vars */
const mockApi = () => (
  {
    fetchHendelser: () => new Promise((resolve, reject) => {}),
  }
);
/* eslint-enable no-unused-vars */

const flushPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<RenderVarslinger api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Hendelser fetching', async () => {
  const api = mockApi();
  api.fetchHendelser = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      [
        {
          eventTidspunkt: '2019-11-27T17:51:26.001Z',
          eventId: '1874877086001',
          uid: '957de6ce-f44f-47de-84d2-639ab2684627',
          tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
          link: 'https://enNyLenke',
          sistOppdatert: '2019-11-27T17:51:26.17575Z',
          type: 'BESKJED',
        },
        {
          eventTidspunkt: '2019-11-27T17:51:31.214Z',
          eventId: '1674877091214',
          tekst: 'Du har en sykemelding som må godkjennes',
          link: 'https://enNyLenke',
          sistOppdatert: '2019-11-27T17:51:31.414467Z',
          type: 'OPPGAVE',
        },
        {
          eventTidspunkt: '2019-11-27T17:51:31.214Z',
          eventId: '1574377091214',
          tekst: 'Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...',
          link: 'https://enNyLenke',
          sistOppdatert: '2019-11-27T17:51:31.414467Z',
          type: 'INNBOKS',
        },
      ],
    );
  });
  const component = ReactTestRenderer.create(wrapIntl(<RenderVarslinger api={api} />));
  await flushPromises();

  expect(component.toJSON()).toMatchSnapshot();
});
