import * as React from 'react';
import sinon from 'sinon';
import PaabegynteSoknader from 'components/meldinger/PaabegynteSoknader';
import wrapIntl from 'utils/intlTestHelper';
import * as useSaker from '../../../hooks/useSaker';
import StoreProvider from '../../../context/StoreProvider';
const ReactTestRenderer = require('react-test-renderer');

jest.mock('react-ga');
let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  useSaker.usePaabegynteSoknader.restore();
});

test('PaabegynteSoknader empty array', () => {
  sandbox.stub(useSaker, 'usePaabegynteSoknader')
    .returns([{
      data: { content: null },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PaabegynteSoknader />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader one soknad', () => {
  const paabegynteSoknader = {
    "url": "http://nav.no",
    "antallPaabegynte": 1
  };

  sandbox.stub(useSaker, 'usePaabegynteSoknader')
    .returns([{
      data: { content: paabegynteSoknader },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PaabegynteSoknader />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader several soknader', () => {
  const paabegynteSoknader = {
    "url": "https://tjenester-t6.nav.no/",
    "antallPaabegynte": 3
  };

  sandbox.stub(useSaker, 'usePaabegynteSoknader')
    .returns([{
      data: { content: paabegynteSoknader },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PaabegynteSoknader />
    </StoreProvider>
    ));

  expect(component.toJSON()).toMatchSnapshot();
});
