import * as React from 'react';
import Meldekort from 'js/components/meldinger/Meldekort';
import wrapIntl from 'js/IntlTestHelper';
import i18n from 'translations/i18n';
const ReactTestRenderer = require('react-test-renderer');

i18n.nb.formatDate = date => new Date(date).toLocaleDateString('en-US');

test('basic Meldekort test with no meldekort', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Meldekort />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic Meldekort test', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('no cards no risk', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('more than 13 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('12 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic zero Meldekort test', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('nesteInnsendingAvMeldekort is null', () => {
  const meldekort = {
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

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Meldekort without next card test', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 0,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} />));
  expect(component.toJSON()).toMatchSnapshot();
});
