import React from 'react';
import wrapIntl from 'js/IntlTestHelper';
import Home from '../../js/pages/Home';
const ReactTestRenderer = require('react-test-renderer');

const mockApi = () => {
  return {
    fetchPersonInfoAndServices: () => new Promise((resolve, reject) => {}),
    fetchSaker: () => new Promise((resolve, reject) => {}),
    fetchMeldinger: () => new Promise((resolve, reject) => {}),
    fetchSakstema: () => new Promise((resolve, reject) => {}),
    useFetchEverythingForHome: () => {
      return [{ info: {}, paabegynteSoknader: null, sakstema: { antallSakstema: 0, sakstemaList: [] }, mininnboks: [], errors: [], isLoaded: true}]
    }
  }
};

it('render Home page without props', () => {
  const info = {};

  const paabegynteSoknader = {
    url: 'https://tjenester-t6.nav.no/',
    antallPaabegynte: 2,
    feilendeBaksystem: [],
  };

  const mininnboks = [];
  const sakstema = { antallSakstema: 0, sakstemaList: [] };

  const isLoaded = true;

  const component = ReactTestRenderer
    .create(wrapIntl(<Home api={mockApi()} info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} isLoaded={isLoaded} sakstema={sakstema} />));

  expect(component.toJSON()).toMatchSnapshot();
});
