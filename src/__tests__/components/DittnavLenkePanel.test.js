import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import DittnavLenkePanel from 'js/components/DittnavLenkePanel';

const ReactTestRenderer = require('react-test-renderer');

const sakstemaMedSaker = {
  antallSakstema: 5,
  sakstemaList: [
    {
      temanavn: 'Tema 1',
      sisteBehandlingStatus: 'FERDIG_BEHANDLET',
      sisteOppdatering: '2019-07-22',
      url: '#',
    },
    {
      temanavn: 'Tema 2',
      sisteBehandlingStatus: 'UNDER_BEHANDLING',
      sisteOppdatering: '2019-07-23',
      url: '#',
    },
  ],
};

const sakstemaUtenSaker = {
  antallSakstema: 0,
  sakstemaList: [],
};

test('Snapshot test med saker', () => {
  const component = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel sakstema={sakstemaMedSaker} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Snapshot test uten saker', () => {
  const component = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel sakstema={sakstemaUtenSaker} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Sammenligner med og uten saker (skal ikke være like)', () => {
  const componentMedSaker = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel sakstema={sakstemaMedSaker} />));
  const componentUtenSaker = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel sakstema={sakstemaUtenSaker} />));
  expect(componentMedSaker.toJSON()).not.toEqual(componentUtenSaker.toJSON());
});
