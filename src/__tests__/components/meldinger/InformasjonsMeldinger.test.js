import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import InformasjonsMeldinger from 'js/components/meldinger/InformasjonsMeldinger'
import wrapIntl from 'js/IntlTestHelper';

test('InformasjonsMeldinger without messages', () => {
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger visGenerellInfo={false}
                                                                             visMeldekortbrukerInfo={false} />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with general', () => {
  const message =  'Hello';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger generellInfoTittel={message}
                                                                             visGenerellInfo={true}
                                                                             visMeldekortbrukerInfo={false}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort', () => {
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger meldekortbrukerInfo={melderkortMessage}
                                                                             isMeldeKortUser={true}
                                                                             visGenerellInfo={false}
                                                                             visMeldekortbrukerInfo={true}  />));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with meldekort but not user', () => {
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger meldekortbrukerInfo={melderkortMessage}
                                                                             isMeldeKortUser={false}
                                                                             visGenerellInfo={false}
                                                                             visMeldekortbrukerInfo={false}/>));
  expect(component.toJSON()).toMatchSnapshot();
});

test('InformasjonsMeldinger with both', () => {
  const message =  'Hello';
  const melderkortMessage =  'Melderkort message';
  const component = ReactTestRenderer.create(wrapIntl(<InformasjonsMeldinger generellInfoTittel={message}
                                                                             visGenerellInfo={true}
                                                                             meldekortbrukerInfo={melderkortMessage}
                                                                             visMeldekortbrukerInfo={true}
                                                                             isMeldeKortUser={true} />));
  expect(component.toJSON()).toMatchSnapshot();
});
