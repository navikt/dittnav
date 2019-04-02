import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import InformasjonsMeldinger from 'js/components/meldinger/InformasjonsMeldinger'
import wrapIntl from 'js/IntlTestHelper';

test('InformasjonsMeldinger without messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with general', () => {
  const message =  'Hello';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger generellInfo={message}
                                                                             visGenerellInfo={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort', () => {
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger meldekortbrukerInfo={melderkortMessage}
                                                                             isMeldeKortUser={true}
                                                                             visMeldekortbrukerInfo={true}  />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort but not user', () => {
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger meldekortbrukerInfo={melderkortMessage}
                                                                             isMeldeKortUser={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with both', () => {
  const message =  'Hello';
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger generellInfo={message}
                                                                             visGenerellInfo={true}
                                                                             meldekortbrukerInfo={melderkortMessage}
                                                                             visMeldekortbrukerInfo={true}
                                                                             isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
