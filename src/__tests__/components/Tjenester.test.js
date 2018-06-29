import * as React from 'react';
import Tjenester from '../../js/components/Tjenester';
const ReactTestRenderer = require('react-test-renderer');

test('basic green Tjenester snaphot-test', () => {
    const component = ReactTestRenderer.create((<Tjenester services={[]} />));
    expect(component.toJSON()).toMatchSnapshot();
});

test('render Tjenester without services', () => {
  const component = ReactTestRenderer.create((<Tjenester />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('render a couple of services', () => {
    const services = [
        { "url": "https://nav.no/", "title": "Din Pensjon", "description": "Short desc", "className": "din_pensjon" },
        { "url": "https://nav.no/abc", "title": "Meldekort", "description": "Mock desc", "className": "registrer_arbeidssoker" },
    ];
    const component = ReactTestRenderer.create((<Tjenester services={services} />));
    expect(component.toJSON()).toMatchSnapshot();
});