import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import PaabegynteSoknader from 'js/components/meldinger/PaabegynteSoknader';
import wrapIntl from 'js/IntlTestHelper';

test('PaabegynteSoknader green test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader empty array', () => {
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSoknader={null} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader one soknad', () => {
  const paabegynteSoknader = {
    "url": "http://nav.no",
    "antallPaabegynte": 1
  };
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('PaabegynteSoknader several soknader', () => {
  const paabegynteSoknader = {
    "url": "https://tjenester-t6.nav.no/",
    "antallPaabegynte": 3
  };
  const component = ReactTestRenderer.create(wrapIntl(<PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />));
  expect(component.toJSON()).toMatchSnapshot();
});
