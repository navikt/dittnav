import * as React from 'react';
import InfoMeldinger from 'js/components/InfoMeldinger';
import wrapIntl from 'js/IntlTestHelper';
import ShallowRenderer from 'react-test-renderer/shallow';

test('render empty InfoMeldinger component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});
