import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import PleiepengerList from 'js/components/meldinger/PleiepengerList';

test('empty PleiepengerList green test', () => {
  const component = ReactTestRenderer.create((<PleiepengerList />));
  expect(component.toJSON()).toMatchSnapshot();
});
