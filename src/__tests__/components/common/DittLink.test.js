import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import DittLink from 'components/common/DittLink'

test('DittLink renders', () => {
  const component = ReactTestRenderer.create(<DittLink url='nav.no'><div>hello</div></DittLink>);
  expect(component.toJSON()).toMatchSnapshot();
});
