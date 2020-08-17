import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Brukernotifikasjoner from 'js/components/Brukernotifikasjoner';
import BeskjedStoreProvider from 'js/context/BeskjedStoreProvider';
import { MemoryRouter } from 'react-router-dom';
const ReactTestRenderer = require('react-test-renderer');

jest.mock('react-ga');

const beskjeder = [
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1784093204636',
    uid: '934de6ce-f94f-47de-84d2-639ac2674627',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    uid: '9346e6ce-f94f-47de-84g2-639ac2674627',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
];

const oppgaver = [
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1582093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1587093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
];

const innbokser = [
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '2584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '6584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
];

const innlogging = {
  securityLevel: '4',
};

test('Brukernotifikasjoner empty', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner oppgaver={null} innbokser={null} innlogging={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider beskjeder={beskjeder}>
        <Brukernotifikasjoner oppgaver={null} innbokser={null} innlogging={innlogging} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});


test('Brukernotifikasjoner with oppgaver', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner oppgaver={oppgaver} innbokser={null} innlogging={innlogging} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider>
        <Brukernotifikasjoner oppgaver={null} innbokser={innbokser} innlogging={innlogging} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider beskjeder={beskjeder}>
        <Brukernotifikasjoner oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser, but no innlogging', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <MemoryRouter initialEntries={['/person/dittnav']}>
      <BeskjedStoreProvider beskjeder={beskjeder}>
        <Brukernotifikasjoner oppgaver={oppgaver} innbokser={innbokser} innlogging={null} />
      </BeskjedStoreProvider>
    </MemoryRouter>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
