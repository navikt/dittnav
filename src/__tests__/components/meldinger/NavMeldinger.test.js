import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import NavMeldinger from 'js/components/meldinger/NavMeldinger'
import wrapIntl from 'js/IntlTestHelper';

test('NavMeldinger without messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<NavMeldinger navMessagesCount={0} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('NavMeldinger with 1 message', () => {
  const component = ReactTestRenderer.create(wrapIntl(<NavMeldinger navMessagesCount={1} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('NavMeldinger with 5 messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<NavMeldinger navMessagesCount={5} />));
  expect(component.toJSON()).toMatchSnapshot();
});
