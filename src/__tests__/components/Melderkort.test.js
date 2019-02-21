import * as React from 'react';
import Meldekort from 'js/components/Meldekort';
import wrapIntl from 'js/IntlTestHelper';
import i18n from 'translations/i18n';
const ReactTestRenderer = require('react-test-renderer');

const getCurrentDate = () => new Date(1531830078487);
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
        datoForTrekk: 1533814941280,
        risikererTrekk: true,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        datoForTrekk: 1533814941280,
        risikererTrekk: true,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('no cards no risk', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 0,
      nesteMeldekort: {
        datoForTrekk: 1533814941280,
        risikererTrekk: false,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        datoForTrekk: null,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: null,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('more than 13 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 13,
      nesteMeldekort: {
        datoForTrekk: null,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: null,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('12 Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 12,
      nesteMeldekort: {
        datoForTrekk: null,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: null,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic zero Meldekort test', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 0,
      nesteMeldekort: {
        datoForTrekk: 1533814941280,
        risikererTrekk: true,
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: 1541808093471,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('nesteInnsendingAvMeldekort is null', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 1,
      nesteMeldekort: {
        uke: 'week 42',
        kanSendesFra: 1531808013471,
        til: 1531808093471,
        fra: 1531838093471,
      },
      nesteInnsendingAvMeldekort: null,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Meldekort without next card test', () => {
  const meldekort = {
    nyeMeldekort: {
      antallNyeMeldekort: 0,
    },
    resterendeFeriedager: 12,
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});
