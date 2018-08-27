import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import InformasjonsMeldinger from 'js/components/meldinger/InformasjonsMeldinger'
import wrapIntl from 'js/Intl';

test('InformasjonsMeldinger without messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with general', () => {
  const infoMessages = {'generell.informasjonsmelding': 'Hello'};
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger infoMessages={infoMessages} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message'};
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort but not user', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message'};
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with both', () => {
  const infoMessages = {'meldekortbruker.informasjonsmelding': 'Melderkort message', 'generell.informasjonsmelding': 'Hello'};
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger infoMessages={infoMessages} isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
