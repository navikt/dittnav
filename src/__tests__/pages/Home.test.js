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

  const isLoaded = true;

  const component = ReactTestRenderer
    .create(wrapIntl(<Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} isLoaded={isLoaded} />));

  expect(component.toJSON()).toMatchSnapshot();
});
