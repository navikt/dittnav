import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import MinInnboks from 'js/components/meldinger/MinInnboks'
import wrapIntl from 'js/IntlTestHelper';

test('MinInnboks without any messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one document', () => {
  const mininnboks = [{"type": "DOKUMENT_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents but different types', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "antall": "1", "url": "https://tjenester-t6.nav.no/mininnboks"},
    {"type": "UBESVART", "antall": "1", "url": "https://tjenester-t6.nav.no/someother"}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one task', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with zero tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 0, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unread task and one unread', () => {
  const mininnboks = [
    {"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"},
    {"type": "ULEST", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unread', () => {
  const mininnboks = [
    {"type": "ULEST", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}
  ];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unanswered', () => {
  const mininnboks = [{"type": "UBESVART", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unanswered', () => {
  const mininnboks = [{"type": "UBESVART", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}];
  const component = ReactTestRenderer.create(wrapIntl(<MinInnboks mininnboks={mininnboks} />));
  expect(component.toJSON()).toMatchSnapshot();
});
