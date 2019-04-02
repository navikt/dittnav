import * as React from 'react';
import InfoMeldinger from 'js/components/InfoMeldinger';
import wrapIntl from 'js/IntlTestHelper';
import ShallowRenderer from 'react-test-renderer/shallow';


test('render empty InfoMeldinger component', () => {
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger isInactive={false} />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});

test('render InfoMeldinger with empty infoMessages', () => {
  const infoMessages = {};
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger infoMessages={infoMessages} isInactive={false} />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages', () => {
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger agMessagesCount={1} isInactive={false} />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages but inactive', () => {
  const renderer = new ShallowRenderer();
  renderer.render(wrapIntl(<InfoMeldinger agMessagesCount={1} isInactive />));
  const component = renderer.getRenderOutput();
  expect(component).toMatchSnapshot();
});
