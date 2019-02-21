import * as React from 'react';
import Login from 'js/pages/Login';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('Login renders', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Login />));
  expect(component.toJSON()).toMatchSnapshot();
});
