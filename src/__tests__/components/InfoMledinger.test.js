import * as React from 'react';
import InfoMeldinger from 'js/components/InfoMeldinger';
const ReactTestRenderer = require('react-test-renderer');

test('render empty InfoMeldinger component', () => {
  const component = ReactTestRenderer.create((<InfoMeldinger isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with empty infoMessages', () => {
  const infoMessages = {};
  const component = ReactTestRenderer.create((<InfoMeldinger infoMessages={infoMessages} isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages', () => {
  const component = ReactTestRenderer.create((<InfoMeldinger agMessagesCount={1} isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages but inactive', () => {
  const component = ReactTestRenderer.create((<InfoMeldinger agMessagesCount={1} isInactive={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
