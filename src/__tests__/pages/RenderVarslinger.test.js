import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import RenderVarslinger from 'js/pages/Varslinger/RenderVarslinger';
import wrapIntl from 'js/IntlTestHelper';
import ShallowRenderer from 'react-test-renderer/shallow';
import StoreProvider from '../../js/context/StoreProvider';

jest.mock('react-ga');

const mockApi = () => (
  {
    fetchBeskjeder: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchOppgaver: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchInnbokser: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchInnloggingsstatus: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchInaktiveBeskjeder: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchInaktiveOppgaver: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
    fetchInaktiveInnbokser: () => new Promise((resolve, reject) => {}), // eslint-disable-line no-unused-vars
  }
);

const flushPromises = () => (
  new Promise(resolve => setImmediate(resolve))
);

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav/varslinger']}>
      <StoreProvider>
        <RenderVarslinger api={mockApi()} />
      </StoreProvider>
    </MemoryRouter>,
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});

it('expect Brukernotifikasjoner fetching', async () => {
  const api = mockApi();

  api.fetchBeskjeder = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      [
        {
          uid: '2313ef1a-a69a-45d9-a3ff-38e4522710e0',
          eventTidspunkt: '2020-03-13T08:53:17.47Z',
          eventId: '1584093197470',
          tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
          link: 'https://enNyLenke',
          produsent: 'dittnav',
          sistOppdatert: '2020-03-13T08:53:17.773555Z',
          sikkerhetsnivaa: 4,
        },
        {
          eventTidspunkt: '2019-11-27T12:24:34.671Z',
          eventId: '1174857474672',
          uid: '934de6ce-f94f-47de-84d2-639ac2674627',
          tekst: 'Vi har mottatt din søknad om pleiepenger. Hvis du er arbeidstaker må du ta kontakt med arbeidsgiver.',
          link: null,
          produsent: 'dittnav',
          sistOppdatert: '2019-11-27T12:24:35.014517Z',
          sikkerhetsnivaa: 4,
        },
        {
          uid: 'b922506b-7789-4416-beab-409a7681f53e',
          eventTidspunkt: '2020-03-13T09:03:01.449Z',
          eventId: '1584093781449',
          tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
          link: '',
          produsent: 'dittnav',
          sistOppdatert: '2020-03-13T09:03:01.663016Z',
          sikkerhetsnivaa: 4,
        },
      ],
    );
  });

  api.fetchOppgaver = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      [
        {
          eventTidspunkt: '2020-03-13T08:53:24.636Z',
          eventId: '1584093204636',
          tekst: 'oppgave',
          link: '',
          produsent: 'dittnav',
          sistOppdatert: '2020-03-13T08:53:25.002983Z',
          sikkerhetsnivaa: 4,
        },
      ],
    );
  });

  api.fetchInnbokser = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve(
      [
        {
          eventTidspunkt: '2020-03-13T08:53:31.607Z',
          eventId: '1584093211607',
          tekst: 'Innboks',
          link: '',
          produsent: 'dittnav',
          sistOppdatert: '2020-03-13T08:53:31.969676Z',
          sikkerhetsnivaa: 4,
        },
      ],
    );
  });

  api.fetchInnlogging = () => new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve({
      securityLevel: '4',
    });
  });

  const renderer = new ShallowRenderer();

  renderer.render(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav/varslinger']}>
      <StoreProvider>
        <RenderVarslinger api={api} />
      </StoreProvider>
    </MemoryRouter>,
  ));

  const component = renderer.getRenderOutput();
  await flushPromises();

  expect(component).toMatchSnapshot();
});
