import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Oppgave from 'js/components/brukernotifikasjoner/Oppgave';
import wrapIntl from 'js/IntlTestHelper';

test('Oppgave with sikkerhetsnivaa 4 and innloggingsnivaa 4', () => {
  const oppgave = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  };

  const innlogging = {
    securityLevel: '4',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Oppgave oppgave={oppgave} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Oppgave with sikkerhetsnivaa 4 and innloggingsnivaa 3', () => {
  const oppgave = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  };

  const innlogging = {
    securityLevel: '3',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Oppgave oppgave={oppgave} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Oppgave with sikkerhetsnivaa 3 and innloggingsnivaa 3', () => {
  const oppgave = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  };

  const innlogging = {
    securityLevel: '3',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Oppgave oppgave={oppgave} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Oppgave with sikkerhetsnivaa 3 and innloggingsnivaa 4', () => {
  const oppgave = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Du har en sykemelding som må godkjennes',
    link: 'https://enNyLenke',
    produsent: 'dittnav',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  };

  const innlogging = {
    securityLevel: '4',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Oppgave oppgave={oppgave} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});
