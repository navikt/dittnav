import * as React from 'react';
import FeilMeldinger from 'js/components/FeilMeldinger';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('render empty FeilMeldinger', () => {
  const component = ReactTestRenderer.create(wrapIntl(<FeilMeldinger />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render one error FeilMeldinger', () => {
  const component = ReactTestRenderer.create(wrapIntl(<FeilMeldinger errors={['error.general.connection.problem']} />));
  expect(component.toJSON()).toMatchSnapshot();
});
