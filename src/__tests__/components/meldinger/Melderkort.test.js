import * as React from 'react';
import Meldekort from 'components/meldinger/meldekort/Meldekort';
import wrapIntl from 'utils/intlTestHelper';
import i18n from 'language/i18n';
import StoreProvider from '../../../context/StoreProvider';
import * as usePerson from '../../../hooks/usePerson';
import sinon from 'sinon';
const ReactTestRenderer = require('react-test-renderer');

let sandbox = null;

beforeEach(() => {
  sandbox = sinon.createSandbox();
});

afterEach(() => {
  usePerson.useMeldekort.restore();
});

i18n.nb.formatDate = date => new Date(date).toLocaleDateString('en-US');

test('basic Meldekort test with no meldekort', () => {
  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: null },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort/>
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic Meldekort test', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 2,
      nesteMeldekort: {
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        fra: '2018-07-17',
        til: '2018-07-17',
        sisteDatoForTrekk: '2018-08-09',
        risikererTrekk: true,
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        fra: '2018-07-17',
        til: '2018-07-17',
        sisteDatoForTrekk: '2018-08-09',
        risikererTrekk: true,
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-08-09',
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('no cards no risk', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 0,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-08-09',
        risikererTrekk: false,
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-07-17',
        uke: 'week 42',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: null,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
    ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('more than 13 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 13,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-07-17',
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: null,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('12 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 12,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-07-17',
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: null,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('basic zero Meldekort test', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 0,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-08-09',
        risikererTrekk: true,
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: '2018-11-10',
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('nesteInnsendingAvMeldekort is null', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        sisteDatoForTrekk: '2018-08-09',
        uke: '42-43',
        kanSendesFra: '2018-07-17',
        til: '2018-07-17',
        fra: '2018-07-17',
      },
      nesteInnsendingAvMeldekort: null,
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});

test('Meldekort without next card test', () => {
  const meldekort = {
    meldekortbruker: true,
    nyeMeldekort: {
      antallNyeMeldekort: 0,
    },
    resterendeFeriedager: 12,
  };

  sandbox.stub(usePerson, 'useMeldekort')
    .returns([{
      data: { content: meldekort },
      isLoading: false,
      isSuccess: true,
    }]);

  const component = ReactTestRenderer.create(wrapIntl(
    <StoreProvider>
      <Meldekort />
    </StoreProvider>
  ));

  expect(component.toJSON()).toMatchSnapshot();
});
