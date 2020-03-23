import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Innboks from 'js/components/brukernotifikasjoner/Innboks';
import wrapIntl from 'js/IntlTestHelper';

test('Innboks with sikkerhetsnivaa 4 and innloggingsnivaa 4', () => {
  const innboks = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  };

  const innlogging = {
    securityLevel: '4',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Innboks innboks={innboks} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 4 and innloggingsnivaa 3', () => {
  const innboks = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 4,
  };

  const innlogging = {
    securityLevel: '3',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Innboks innboks={innboks} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 3 and innloggingsnivaa 3', () => {
  const innboks = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  };

  const innlogging = {
    securityLevel: '3',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Innboks innboks={innboks} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Innboks with sikkerhetsnivaa 3 and innloggingsnivaa 4', () => {
  const innboks = {
    eventTidspunkt: '2020-03-13T08:53:24.636Z',
    eventId: '1584093204636',
    tekst: 'Samtalereferat fra telefonsamtale 08.12.2019 kl. 11:44',
    link: 'https://enNyLenke',
    sistOppdatert: '2020-03-13T08:53:25.002983Z',
    sikkerhetsnivaa: 3,
  };

  const innlogging = {
    securityLevel: '4',
  };

  const component = ReactTestRenderer.create(wrapIntl(<Innboks innboks={innboks} innlogging={innlogging}/>));
  expect(component.toJSON()).toMatchSnapshot();
});
