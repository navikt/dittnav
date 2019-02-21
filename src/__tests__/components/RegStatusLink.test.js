import * as React from 'react';
import RegStatusLink from 'js/components/RegStatusLink';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('RegStatusLink basic test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test isRegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink isRegisteredAtIArbeid />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test is not RegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink isRegisteredAtIArbeid={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});
