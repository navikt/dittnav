import * as React from 'react';
const ReactTestRenderer = require('react-test-renderer');
import { LenkepanelMedIkon, IkonPille} from 'js/components/LenkepanelMedIkon';
import wrapIntl from 'js/IntlTestHelper';

test('basic green component snaphot-test', () => {
  const component = ReactTestRenderer.create(wrapIntl(<LenkepanelMedIkon
    alt="Ditt sykefravær"
    overskrift="fliser.ditt.sykevravaer"
    ingress="fliser.ditt.sykevravaer.ingress"
    className="first"
    href='https://www.nav.no'><IkonPille /></LenkepanelMedIkon>));

  expect(component.toJSON()).toMatchSnapshot();
});
