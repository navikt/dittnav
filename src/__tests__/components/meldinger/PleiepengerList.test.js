import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import PleiepengerList from 'js/components/meldinger/PleiepengerList';

test('empty PleiepengerList green test', () => {
  const component = ReactTestRenderer.create((<PleiepengerList />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList empty list', () => {
  const component = ReactTestRenderer.create((<PleiepengerList pleiepenger={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList list with one element', () => {
  const component = ReactTestRenderer.create((<PleiepengerList pleiepenger={[{child: "123321", usedPerToday: "123"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PleiepengerList list with two elements', () => {
  const component = ReactTestRenderer.create((<PleiepengerList pleiepenger={[{child: "123321", usedPerToday: "123"}, {child: "123321", usedPerToday: "12"}]} />));
  expect(component.toJSON()).toMatchSnapshot();
});