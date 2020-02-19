import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import AktiveVarsler from '../../js/pages/Varslinger/AktiveVarsler';
const ReactTestRenderer = require('react-test-renderer');

test('AktiveVarsler empty', () => {
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={null} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one beskjed', () => {
  const hendelser = [
    {
      produsent: 'DittNAV',
      eventTidspunkt: '2019-11-27T17:51:26.001Z',
      eventId: '1874877086001',
      tekst: 'Vi mottok søknaden din 18. september 2019. Du kan følge med på statusen i Dine foreldrepenger.',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:26.17575Z',
      type: 'BESKJED',
    },
  ];
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one oppgave', () => {
  const hendelser = [
    {
      produsent: 'DittNAV',
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1674877091214',
      tekst: 'Du har en sykemelding som må godkjennes',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      type: 'OPPGAVE',
    },
  ];
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler one innboks', () => {
  const hendelser = [
    {
      produsent: 'DittNAV',
      eventTidspunkt: '2019-11-27T17:51:31.214Z',
      eventId: '1574377091214',
      tekst: 'Svar fra veilederen din i innboksen: Hei, nå har jeg sjekket om...',
      link: 'https://enNyLenke',
      sistOppdatert: '2019-11-27T17:51:31.414467Z',
      type: 'INNBOKS',
    },
  ];
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AktiveVarsler several hendelser', () => {
  const hendelser = [
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
  ];
  const component = ReactTestRenderer.create(wrapIntl(<AktiveVarsler hendelser={hendelser} />));
  expect(component.toJSON()).toMatchSnapshot();
});