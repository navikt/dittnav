import * as React from 'react';
import InfoMeldinger from 'js/components/InfoMeldinger';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';

test('render empty InfoMeldinger component', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InfoMeldinger isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with empty infoMessages', () => {
  const infoMessages = {};
  const component = ReactTestRenderer.create(wrapIntl(<InfoMeldinger infoMessages={infoMessages} isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InfoMeldinger agMessagesCount={1} isInactive={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render InfoMeldinger with ag messages but inactive', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InfoMeldinger agMessagesCount={1} isInactive={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
