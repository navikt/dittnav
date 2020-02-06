import React from 'react';
import ReactDOM from 'react-dom';
import RenderVarslinger from 'js/pages/Varslinger/RenderVarslinger';
import wrapIntl from 'js/IntlTestHelper';

const ReactTestRenderer = require('react-test-renderer');

const mockApi = () => {
  return {
    fetchHendelser: () => new Promise((resolve, reject) => {}),
  };
};

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(<RenderVarslinger api={mockApi()} />), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Oppfolging fetching', async () => {
  const api = mockApi();
  api.fetchHendelser = () => new Promise((resolve, reject) => {
    resolve(
      [
        {
          produsent: 'DittNAV',
          eventTidspunkt: '2019-11-27T17:51:26.001Z',
          eventId: '1874877086001',
          tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
          link: 'https://enNyLenke',
          sistOppdatert: '2019-11-27T17:51:26.17575Z',
          type: 'BESKJED',
        },
        {
          produsent: 'DittNAV',
          eventTidspunkt: '2019-11-27T17:51:31.214Z',
          eventId: '1674877091214',
          tekst: 'Du har en sykemelding som må godkjennes',
          link: 'https://enNyLenke',
          sistOppdatert: '2019-11-27T17:51:31.414467Z',
          type: 'OPPGAVE',
        },
        {
          produsent: 'DittNAV',
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
