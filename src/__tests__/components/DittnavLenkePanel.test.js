import * as React from 'react';
import sinon from 'sinon';
import wrapIntl from 'utils/intlTestHelper';
import DittnavLenkePanel from 'components/DittnavLenkePanel';
import BeskjedStoreProvider from 'context/StoreProvider';
import * as useSaker from '../../hooks/useSaker';

const ReactTestRenderer = require('react-test-renderer');

let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  useSaker.useSakstema.restore();
});

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
  sandbox.stub(useSaker, 'useSakstema')
    .returns([{
      data: { content: sakstemaMedSaker },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider>
      <DittnavLenkePanel />
    </BeskjedStoreProvider>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('Snapshot test uten saker', () => {
  sandbox.stub(useSaker, 'useSakstema')
    .returns([{
      data: { content: sakstemaUtenSaker },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <BeskjedStoreProvider>
      <DittnavLenkePanel />
    </BeskjedStoreProvider>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});
