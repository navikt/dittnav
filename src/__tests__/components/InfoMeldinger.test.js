import * as React from 'react';
import InfoMeldinger from 'components/InfoMeldinger';
import wrapIntl from 'utils/intlTestHelper';
import ShallowRenderer from 'react-test-renderer/shallow';

test('render empty InfoMeldinger component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});
