import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import InformasjonsMeldinger from 'js/components/meldinger/InformasjonsMeldinger'

test('InformasjonsMeldinger without messages', () => {
  const component = ReactTestRenderer.create((<InformasjonsMeldinger />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with general', () => {
  const infoMessages = {'generell.informasjonsmelding': 'Hello'};
  const component = ReactTestRenderer.create((<InformasjonsMeldinger infoMessages={infoMessages} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message'};
  const component = ReactTestRenderer.create((<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort but not user', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message'};
  const component = ReactTestRenderer.create((<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with both', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message', 'generell.informasjonsmelding': 'Hello'};
  const component = ReactTestRenderer.create((<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
