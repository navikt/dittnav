import * as React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import DittnavLenkePanel from 'js/components/DittnavLenkePanel';

const ReactTestRenderer = require('react-test-renderer');
const {act} = ReactTestRenderer;

const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};

const mockApi = (pool, group) => {
  const r = {}
  if (pool && group) {
    r[pool] = true;
    r[group] = true;
  }
  return {
    fetchUnleashFeatures: () => new Promise((resolve, reject) => pool && group ? resolve(r) : reject('this is expected')),
  }
};

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
  const component = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel api={mockApi()} sakstema={sakstemaMedSaker} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Snapshot test uten saker', () => {
  const component = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel api={mockApi()} sakstema={sakstemaUtenSaker} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Snapshot test med unleash', async () => {
  let component;
  act(() => {
    component = ReactTestRenderer.create(wrapIntl(<DittnavLenkePanel api={mockApi('dittnav.nytt-dinesakerpanel-testpool', 'dittnav.nytt-dinesakerpanel-ab')} sakstema={sakstemaMedSaker} />));
  });

  await act(() => {
    flushPromises();
  })

  expect(component.toJSON()).toMatchSnapshot();
});
