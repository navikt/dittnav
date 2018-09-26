import * as React from 'react';
import PersonInfo from 'js/components/PersonInfo';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';

test('basic green PersonInfo snaphot-test', () => {
  const personInfo = { name: "Hello", erRegistrert: true, erInaktiv: false, fgkode: "IARBS", yrke: "DAGP" };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic green PersonInfo snaphot-test without fgkode/yrke', () => {
  const personInfo = { name: "Hello", erRegistrert: true, erInaktiv: false };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo without personInfo', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo inactive', () => {
  const personInfo = { name: "Hello", erRegistrert: true, erInaktiv: true };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo not registered', () => {
  const personInfo = { name: "Hello", erRegistrert: false, erInaktiv: false };
  const component = ReactTestRenderer.create(wrapIntl(<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});