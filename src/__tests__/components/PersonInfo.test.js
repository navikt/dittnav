import * as React from 'react';
import PersonInfo from 'js/components/PersonInfo';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';

test('basic green PersonInfo snaphot-test', () => {
  const personInfo = { navn: "Hello", registrert: true, inaktiv: false, fgkode: "IARBS", yrke: "DAGP" };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic green PersonInfo snaphot-test without fgkode/yrke', () => {
  const personInfo = { navn: "Hello", registrert: true, inaktiv: false };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo without personInfo', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo inactive', () => {
  const personInfo = { navn: "Hello", registrert: true, inaktiv: true };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo not registered', () => {
  const personInfo = { navn: "Hello", registrert: false, inaktiv: false };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});