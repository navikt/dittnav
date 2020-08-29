import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import wrapIntl from 'js/IntlTestHelper';
import InaktiveVarsler from '../../js/pages/Varslinger/varsler/InaktiveVarsler';
import BeskjedStoreProvider from '../../js/context/BeskjedStoreProvider';
const ReactTestRenderer = require('react-test-renderer');

jest.mock('react-ga');

const beskjeder = [
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
];

const oppgaver = [
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Oppgave: Mangelende dokumentasjon til søknad',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
];

const innbokser = [
  {
    eventTidspunkt: '2020-03-13T08:53:31.607Z',
    eventId: '1584093211607',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:31.969676Z',
    sikkerhetsnivaa: 4,
  },
];

const innloggingsstatus = {
  securityLevel: '4', // eslint-disable-line no-unused-vars
};

test('InaktiveVarsler empty', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <InaktiveVarsler oppgaver={null} innbokser={null} innloggingsstatus={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InaktiveVarsler one beskjed', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider beskjeder={beskjeder}>
        <InaktiveVarsler oppgaver={null} innbokser={null} innloggingsstatus={innloggingsstatus} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InaktiveVarsler one oppgave', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <InaktiveVarsler oppgaver={oppgaver} innbokser={null} innloggingsstatus={innloggingsstatus} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InaktiveVarsler one innboks', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <InaktiveVarsler oppgaver={null} innbokser={innbokser} innloggingsstatus={innloggingsstatus} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InaktiveVarsler several brukernotifikasjoner', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider beskjeder={beskjeder}>
        <InaktiveVarsler oppgaver={oppgaver} innbokser={innbokser} innloggingsstatus={innloggingsstatus} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
