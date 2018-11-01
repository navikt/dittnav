import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import Postkasse from 'js/pages/Postkasse'
import wrapIntl from 'js/IntlTestHelper';

test('Postkasse renders', () => {
  const info = {
    viktigeTjenester: [
      { "url": "https://nav.no/", "tittel": "Din Pensjon", "beskrivelse": "Short desc", "bildenavn": "din_pensjon" },
      { "url": "https://nav.no/abc", "tittel": "Meldekort", "beskrivelse": "Mock desc", "bildenavn": "registrer_arbeidssoker" },
    ]
  }
  const component = ReactTestRenderer.create(wrapIntl(<Postkasse info={info} />));
  expect(component.toJSON()).toMatchSnapshot();
});
