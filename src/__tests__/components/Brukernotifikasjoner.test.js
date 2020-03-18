import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Brukernotifikasjoner from 'js/components/Brukernotifikasjoner';
const ReactTestRenderer = require('react-test-renderer');

const beskjeder = [
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1784093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
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
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1587093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
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
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
  {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '6584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  },
];

const innlogging = {
  securityLevel: '4',
};

test('Brukernotifikasjoner empty', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={null} oppgaver={null} innbokser={null} innlogging={null} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={null} innbokser={null} innlogging={innlogging} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with oppgaver', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={null} oppgaver={oppgaver} innbokser={null} innlogging={innlogging} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={null} oppgaver={null} innbokser={innbokser} innlogging={innlogging} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Brukernotifikasjoner with beskjeder, oppgaver and innbokser, but no innlogging', () => {
  const component = ReactTestRenderer.create(wrapIntl(
    <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={null} />,
  ));
  expect(component.toJSON()).toMatchSnapshot();
});
