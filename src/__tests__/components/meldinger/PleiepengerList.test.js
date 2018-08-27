import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import PleiepengerList from 'js/components/meldinger/PleiepengerList';
import wrapIntl from 'js/IntlTestHelper';

test('empty PleiepengerList green test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PleiepengerList />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList empty list', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PleiepengerList pleiepenger={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList list with one element', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PleiepengerList pleiepenger={[{child: "123321", usedPerToday: "123"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList list with two elements', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PleiepengerList pleiepenger={[{child: "123321", usedPerToday: "123"}, {child: "123321", usedPerToday: "12"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});