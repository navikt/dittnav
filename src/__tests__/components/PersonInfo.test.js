import * as React from 'react';
import sinon from 'sinon';
import PersonInfo from 'js/components/PersonInfo';
import wrapIntl from 'js/utils/intlTestHelper';
import * as usePerson from '../../js/hooks/usePerson';
import StoreProvider from '../../js/context/StoreProvider';
const ReactTestRenderer = require('react-test-renderer');

let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  usePerson.useIdent.restore();
  usePerson.useNavn.restore();
});

test('basic green PersonInfo snaphot-test', () => {
  sandbox.stub(usePerson, 'useNavn')
    .returns([{
      data: { content: { navn: 'Hello' } },
      isLoading: false,
      isError: false,
    }]);

  sandbox.stub(usePerson, 'useIdent')
    .returns([{
      data: { content: null },
      isLoading: false,
      isError: false,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PersonInfo />
    </StoreProvider>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic green PersonInfo snaphot-test without person and with ident', () => {
  sandbox.stub(usePerson, 'useIdent')
    .returns([{
      data: { content: { ident: 123 } },
      isLoading: false,
      isError: false,
    }]);

  sandbox.stub(usePerson, 'useNavn')
    .returns([{
      data: { content: null },
      isLoading: false,
      isError: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PersonInfo />
    </StoreProvider>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo without person and ident', () => {
  sandbox.stub(usePerson, 'useNavn')
    .returns([{
      data: { content: null },
      isLoading: false,
      isError: true,
    }]);

  sandbox.stub(usePerson, 'useIdent')
    .returns([{
      data: { content: null },
      isLoading: false,
      isError: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <PersonInfo />
    </StoreProvider>,
  ));

  expect(component.toJSON()).toMatchSnapshot();
});
