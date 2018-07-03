import * as React from 'react';
import PersonInfo from '../../js/components/PersonInfo';
const ReactTestRenderer = require('react-test-renderer');

test('basic green PersonInfo snaphot-test', () => {
  const personInfo = { name: "Hello", isRegistered: true, isInactive: false, fgkode: "IARBS", yrke: "DAGP" };
  const component = ReactTestRenderer.create((<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic green PersonInfo snaphot-test without fgkode/yrke', () => {
  const personInfo = { name: "Hello", isRegistered: true, isInactive: false };
  const component = ReactTestRenderer.create((<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo without personInfo', () => {
  const component = ReactTestRenderer.create((<PersonInfo />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo inactive', () => {
  const personInfo = { name: "Hello", isRegistered: true, isInactive: true };
  const component = ReactTestRenderer.create((<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PersonInfo not registered', () => {
  const personInfo = { name: "Hello", isRegistered: false, isInactive: false };
  const component = ReactTestRenderer.create((<PersonInfo personInfo={personInfo} />));
  expect(component.toJSON()).toMatchSnapshot();
});