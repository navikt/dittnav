import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import RegStatusLink from '../../js/components/RegStatusLink';

test('RegStatusLink basic test', () => {
  const component = ReactTestRenderer.create((<RegStatusLink />));
  expect(component.toJSON()).toMatchSnapshot();
});
