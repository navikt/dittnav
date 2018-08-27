import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import AgMeldinger from 'js/components/meldinger/AgMeldinger'
import wrapIntl from 'js/Intl';

test('AgMeldinger without messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<AgMeldinger agMessagesCount={0} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AgMeldinger with 1 message', () => {
  const component = ReactTestRenderer.create(wrapIntl(<AgMeldinger agMessagesCount={1} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('AgMeldinger with 6 messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<AgMeldinger agMessagesCount={5} />));
  expect(component.toJSON()).toMatchSnapshot();
});
