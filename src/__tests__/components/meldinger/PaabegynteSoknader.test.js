import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import PaabegynteSoknader from 'js/components/meldinger/PaabegynteSoknader';
import wrapIntl from 'js/IntlTestHelper';

test('PaabegynteSoknader green test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader empty array', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSaker={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader one soknad', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSaker={[{uri: "http://nav.no"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader several soknad', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSaker={[{uri: "http://nav.no"}, {uri: "http://nav.no/1"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});
