import React from 'react';

import Lenkepanel from 'nav-frontend-lenkepanel';
import { FormattedMessage } from 'react-intl';
import Config from '../Config';

const DittnavLenkePanel = () => (
  <div className="dittnav-lenke-container blokk-xl">
    <Lenkepanel border className="first" href={Config.LENKER.utbetalingsoversikt.url}>
      <FormattedMessage id="fliser.dine.utbetalinger" />
    </Lenkepanel>
    <Lenkepanel border href={Config.LENKER.saksoversikt.url}>
      <FormattedMessage id="fliser.dine.saker" />
    </Lenkepanel>
    <Lenkepanel border className="last" href={Config.LENKER.innboks.url}>
      <FormattedMessage id="fliser.innboks" />
    </Lenkepanel>
  </div>
);

export default DittnavLenkePanel;
