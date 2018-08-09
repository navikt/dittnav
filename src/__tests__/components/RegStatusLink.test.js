import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import RegStatusLink from 'js/components/RegStatusLink';

test('RegStatusLink basic test', () => {
  const component = ReactTestRenderer.create((<RegStatusLink />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test isRegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create((<RegStatusLink isRegisteredAtIArbeid={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('RegStatusLink basic test is not RegisteredAtIArbeid', () => {
  const component = ReactTestRenderer.create((<RegStatusLink isRegisteredAtIArbeid={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});
