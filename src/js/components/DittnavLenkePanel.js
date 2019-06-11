import React from 'react';

import Lenkepanel from 'nav-frontend-lenkepanel';
import { FormattedMessage } from 'react-intl';
import Config from '../Config';

const DittnavLenkePanel = () => (
  <div className="dittnav-lenke-container">
    <Lenkepanel border className="first" href={`${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`}>
      <FormattedMessage id="fliser.dine.utbetalinger" />
    </Lenkepanel>
    <Lenkepanel border href={`${Config.dittNav.SERVICES_URL}/saksoversikt/`}>
      <FormattedMessage id="fliser.dine.saker" />
    </Lenkepanel>
    <Lenkepanel border className="last" href={`${Config.dittNav.SERVICES_URL}/mininnboks/`}>
      <FormattedMessage id="fliser.innboks" />
    </Lenkepanel>
  </div>
);

export default DittnavLenkePanel;
