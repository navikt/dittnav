import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import MinInnboks from 'components/meldinger/MinInnboks'
import wrapIntl from 'utils/intlTestHelper';
import sinon from 'sinon';
import StoreProvider from '../../../context/StoreProvider';
import * as usePerson from '../../../hooks/usePerson';

jest.mock('react-ga');
let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  usePerson.useMeldinger.restore();
});

test('MinInnboks with one document', () => {
  const mininnboks = [{"type": "DOKUMENT_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}
  ];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two documents but different types', () => {
  const mininnboks = [
    {"type": "DOKUMENT_VARSEL", "antall": "1", "url": "https://tjenester-t6.nav.no/mininnboks"},
    {"type": "UBESVART", "antall": "1", "url": "https://tjenester-t6.nav.no/someother"}
  ];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));
  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one task', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with zero tasks', () => {
  const mininnboks = [{"type": "OPPGAVE_VARSEL", "antall": 0, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unread task and one unread', () => {
  const mininnboks = [
    {"type": "OPPGAVE_VARSEL", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"},
    {"type": "ULEST", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}
  ];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks mininnboks={mininnboks} />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unread', () => {
  const mininnboks = [{"type": "ULEST", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with one unanswered', () => {
  const mininnboks = [{"type": "UBESVART", "antall": 1, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with two unanswered', () => {
  const mininnboks = [{"type": "UBESVART", "antall": 2, "url": "https://tjenester-t6.nav.no/mininnboks"}];

  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: mininnboks },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
    ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('MinInnboks with empty input', () => {
  sandbox.stub(usePerson, 'useMeldinger')
    .returns([{
      data: { content: [] },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <MinInnboks />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});
