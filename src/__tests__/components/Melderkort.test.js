import * as React from 'react';
import Meldekort from 'js/components/Meldekort';
const ReactTestRenderer = require('react-test-renderer');

const getCurrentDate = () => new Date(1531830078487);
const formatDate = date => new Date(date).toLocaleDateString('en-US');

test('basic Meldekort test with no meldekort', () => {
  const component = ReactTestRenderer.create((<Meldekort />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "count": 2,
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

  const component = ReactTestRenderer.create((<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} formatDate={formatDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "count": 1,
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

  const component = ReactTestRenderer.create((<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} formatDate={formatDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic one Meldekort test no risk', () => {
  const meldekort = {
    "newCards": {
      "count": 1,
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

  const component = ReactTestRenderer.create((<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} formatDate={formatDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});


test('basic one Meldekort test no risk no remaining holidays', () => {
  const meldekort = {
    "newCards": {
      "count": 1,
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

  const component = ReactTestRenderer.create((<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} formatDate={formatDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('basic zero Meldekort test', () => {
  const meldekort = {
    "newCards": {
      "count": 0,
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

  const component = ReactTestRenderer.create((<Meldekort meldekort={meldekort} getCurrentDate={getCurrentDate} formatDate={formatDate} />));
  expect(component.toJSON()).toMatchSnapshot();
});