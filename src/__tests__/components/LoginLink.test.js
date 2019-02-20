import * as React from 'react';
import LoginLink from 'js/components/LoginLink';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('LoginLink renders', () => {
  const testData = {
    id: 'brukernavnpassord',
    title: 'paalogging.alternativ.brukernavnpassord.tittel',
    description: 'paalogging.alternativ.brukernavnpassord.beskrivelse',
    url: 'url',
    linkText: 'paalogging.alternativ.brukernavnpassord.lenketekst',
    linkClassName: 'customStyle',
  };

  const component = ReactTestRenderer.create(wrapIntl(<LoginLink {...testData} />));
  expect(component.toJSON()).toMatchSnapshot();
});
