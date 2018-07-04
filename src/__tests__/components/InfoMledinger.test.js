import * as React from 'react';
import InfoMeldinger from '../../js/components/InfoMeldinger';
const ReactTestRenderer = require('react-test-renderer');

test('render empty InfoMeldinger component', () => {
  const component = ReactTestRenderer.create((<InfoMeldinger />));
  expect(component.toJSON()).toMatchSnapshot();
});
