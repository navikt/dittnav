import * as React from 'react';
import Meldekort from 'js/components/Meldekort';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';
import i18n from 'translations/i18n';

const getCurrentDate = () => new Date(1531830078487);
i18n['nb'].formatDate = date => new Date(date).toLocaleDateString('en-US');

test('basic Meldekort test with no meldekort', () => {
  const component = ReactTestRenderer.create(wrapIntl(<Meldekort />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 2,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": true,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 1,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": true,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 1,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": false,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('no cards no risk', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 0,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": false,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 1,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": false,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": null
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic zero Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 0,
      "nextCard": {
        "datoForTrekk": 1533814941280,
        "risikererTrekk": true,
        "week": "week 42",
        "canBeSubmittedFrom": 1531808013471,
        "until": 1531808093471,
        "from": 1531838093471
      },
      "nextSendingDate": 1541808093471
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('Meldekort without next card test', () => {
  const meldekort = {
    "newCards": {
      "antallNyeMeldekort": 0
    },
    "remainingHolidays": 12
  };

  const component = ReactTestRenderer.create(wrapIntl(<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});