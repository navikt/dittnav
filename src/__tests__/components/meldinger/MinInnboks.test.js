import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import MinInnboks from 'js/components/meldinger/MinInnboks'
import wrapIntl from 'js/IntlTestHelper';

test('MinInnboks without any messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one document', () => {
  const mininnboks = [{"type": "DOKUMENT_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1},
    {"type": "DOKUMENT_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 2}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents but different undertypes', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1},
    {"type": "DOKUMENT_VARSEL", "undertype": "nottestundertype", "uri": "someurl", "varselid": 2}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one task', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unread task and one unread', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "undertype": "testundertype", "uri": "someurl", "varselid": 1}, {"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 5, "statuser": ["UBESVART"]}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unread', () => {
  const mininnboks = [
    {"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 5, "statuser": ["UBESVART"]},
    {"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 6, "statuser": ["UBESVART"]}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unanswered', () => {
  const mininnboks = [{"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 1, "statuser": ["ULEST"]}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unanswered', () => {
  const mininnboks = [
    {"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 1, "statuser": ["ULEST"]},
    {"type": "OTHER_TYPE", "undertype": "testundertype", "uri": "someurl", "varselid": 2, "statuser": ["ULEST"]}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});
