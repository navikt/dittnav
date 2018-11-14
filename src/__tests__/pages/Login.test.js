import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Login from 'js/pages/Login'
import wrapIntl from 'js/IntlTestHelper';

test('Login renders', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Login />));
  expect(component.toJSON()).toMatchSnapshot();
});
