import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import RegStatusLink from 'js/components/RegStatusLink';
import wrapIntl from 'js/IntlTestHelper';

test('RegStatusLink basic test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test isRegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink isRegisteredAtIArbeid={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test is not RegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create(wrapIntl(<RegStatusLink isRegisteredAtIArbeid={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});
