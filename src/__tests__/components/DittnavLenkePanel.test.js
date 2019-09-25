import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import DittnavLenkePanel from 'js/components/DittnavLenkePanel';

const ReactTestRenderer = require('react-test-renderer');

const sakstemaMedSaker = {
  antallSakstema: 6,
  sakstemaList: [
    {
      temanavn: 'Barnetrygd',
      temakode: 'BAR',
      antallStatusUnderBehandling: 0,
      sisteOppdatering: '2019-08-15T12:00:00+02:00',
    },
    {
      temanavn: 'Sykepenger og oppfølging',
      temakode: 'SYK',
      antallStatusUnderBehandling: 10,
      sisteOppdatering: '2019-08-14T12:00:00+02:00',
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
