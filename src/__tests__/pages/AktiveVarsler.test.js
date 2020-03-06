import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import AktiveVarsler from '../../js/pages/Varslinger/AktiveVarsler';
const ReactTestRenderer = require('react-test-renderer');

test('AktiveVarsler empty', () => {
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={null} innlogging={null} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one beskjed', () => {
  const hendelser = [
    {
      eventTidspunkt: '2019-11-27T17:51:26.001Z',
      eventId: '1874877086001',
      uid: '937de6ce-f44f-47de-84d2-639ab2684627',
      tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:26.17575Z',
      sikkerhetsnivaa: 4,
      type: 'BESKJED',
    },
  ];

  const innlogging = {
    securityLevel: '4', // eslint-disable-line no-unused-vars
  };


  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} innlogging={innlogging} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one oppgave', () => {
  const hendelser = [
    {
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1674877091214',
      tekst: 'Du har en sykemelding som må godkjennes',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      sikkerhetsnivaa: 4,
      type: 'OPPGAVE',
    },
  ];
  const innlogging = {
    securityLevel: '4', // eslint-disable-line no-unused-vars
  };


  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} innlogging={innlogging} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one innboks', () => {
  const hendelser = [
    {
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1574377091214',
      tekst: 'Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      sikkerhetsnivaa: 4,
      type: 'INNBOKS',
    },
  ];

  const innlogging = {
    securityLevel: '4', // eslint-disable-line no-unused-vars
  };

  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} innlogging={innlogging} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler several hendelser', () => {
  const hendelser = [
    {
      eventTidspunkt: '2019-11-27T17:51:26.001Z',
      eventId: '1874877086001',
      uid: '937de6ce-f44f-47de-84d2-639ab2684627',
      tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:26.17575Z',
      sikkerhetsnivaa: 4,
      type: 'BESKJED',
    },
    {
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1674877091214',
      tekst: 'Du har en sykemelding som må godkjennes',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      sikkerhetsnivaa: 4,
      type: 'OPPGAVE',
    },
    {
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1574377091214',
      tekst: 'Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      sikkerhetsnivaa: 4,
      type: 'INNBOKS',
    },
  ];

  const innlogging = {
    securityLevel: '4', // eslint-disable-line no-unused-vars
  };

  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} innlogging={innlogging} />));
  expect(component.toJSON()).toMatchSnapshot();
});
