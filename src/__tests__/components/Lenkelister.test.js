import * as React from 'react';
import Lenkelister from 'js/components/Lenkelister';
import Config from "../../js/Config";
const ReactTestRenderer = require('react-test-renderer');

test('basic green Lenkelister test', () => {
  const component = ReactTestRenderer.create((<Lenkelister links={[]} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render Lenkelister without links', () => {
  const component = ReactTestRenderer.create((<Lenkelister />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render a couple of links', () => {
  const links = [
    { url: '/mininnboks', tittel: 'Min innboks' },
    { url: '/saksoversikt', tittel: 'Innsyn og oversikt' },
  ];
  const component = ReactTestRenderer.create((<Lenkelister links={links} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render Lenkelister with fo-links', () => {
  const component = ReactTestRenderer.create((<Lenkelister links= {Config.dittNav.OPPFOLGINGS_LENKER}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render Lenkelister with general-links', () => {
  const component = ReactTestRenderer.create((<Lenkelister links={Config.dittNav.GENERELLE_LENKER}/>));
  expect(component.toJSON()).toMatchSnapshot();
});
