import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Brukernotifikasjoner from 'js/components/Brukernotifikasjoner';
import BeskjedStoreProvider from 'js/context/BeskjedStoreProvider';
const ReactTestRenderer = require('react-test-renderer');

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
    <Brukernotifikasjoner oppgaver={null} innbokser={null} innlogging={null} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider beskjeder={beskjeder}>
      <Brukernotifikasjoner oppgaver={null} innbokser={null} innlogging={innlogging} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});


test('Brukernotifikasjoner with oppgaver', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider>
      <Brukernotifikasjoner oppgaver={oppgaver} innbokser={null} innlogging={innlogging} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider>
      <Brukernotifikasjoner oppgaver={null} innbokser={innbokser} innlogging={innlogging} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider beskjeder={beskjeder}>
      <Brukernotifikasjoner oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser, but no innlogging', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider beskjeder={beskjeder}>
      <Brukernotifikasjoner oppgaver={oppgaver} innbokser={innbokser} innlogging={null} />
    </BeskjedStoreProvider>,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
