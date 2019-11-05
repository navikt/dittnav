import * as React from 'react';
import PersonInfo from 'js/components/PersonInfo';
import wrapIntl from 'js/IntlTestHelper';
const ReactTestRenderer = require('react-test-renderer');

test('basic green PersonInfo snaphot-test', () => {
  const person = { navn: 'Hello' };
  const ident = { ident: 123 };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo person={person} identifikator={ident} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic green PersonInfo snaphot-test without person and with ident', () => {
  const person = null;
  const ident = { ident: 123 };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo person={person} identifikator={ident} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo without person and ident', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo />));
  expect(component.toJSON()).toMatchSnapshot();
});
