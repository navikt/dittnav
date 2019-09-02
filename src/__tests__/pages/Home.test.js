import React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import wrapIntl from 'js/IntlTestHelper';
import Home from '../../js/pages/Home';

it('render Home page without props', () => {
  const info = {};

  const paabegynteSoknader = {
    "url": "https://tjenester-t6.nav.no/",
    "antallPaabegynte": 2,
    "feilendeBaksystem": []
  };

  const mininnboks = [];

  const fetching = 4;

  const component = ReactTestRenderer
    .create(wrapIntl(<Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks}
                           fetching={fetching} />));

  expect(component.toJSON()).toMatchSnapshot();
});
