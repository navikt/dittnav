import React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Home from '../../js/pages/Home';
const ReactTestRenderer = require('react-test-renderer');

it('render Home page without props', () => {
  const info = {};

  const paabegynteSoknader = {
    url: 'https://tjenester-t6.nav.no/',
    antallPaabegynte: 2,
    feilendeBaksystem: [],
  };

  const mininnboks = [];
  const sakstema = {
    antallSaker: 0
  };

  const fetching = 4;

  const component = ReactTestRenderer
    .create(wrapIntl(<Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} fetching={fetching} sakstema={sakstema}/>));

  expect(component.toJSON()).toMatchSnapshot();
});
