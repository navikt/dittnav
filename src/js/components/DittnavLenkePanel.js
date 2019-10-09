import React from 'react';

import Lenkepanel from 'nav-frontend-lenkepanel';
import { FormattedMessage as F, FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Config from '../Config';

const DittnavLenkePanel = () => (
  <div className="dittnav-lenke-container blokk-xl">
    <Lenkepanel border className="first" href={Config.LENKER.utbetalingsoversikt.url}>
      <Undertittel className="lenkepanel__heading">
        <FormattedMessage id="fliser.dine.utbetalinger" />
      </Undertittel>
    </Lenkepanel>
    <Lenkepanel border href={Config.LENKER.saksoversikt.url}>
      <Undertittel className="lenkepanel__heading">
        <FormattedMessage id="fliser.dine.saker" />
      </Undertittel>
    </Lenkepanel>
    <Lenkepanel border className="last" href={Config.LENKER.innboks.url}>
      <Undertittel className="lenkepanel__heading">
        <FormattedMessage id="fliser.innboks" />
      </Undertittel>
    </Lenkepanel>
  </div>
);

export default DittnavLenkePanel;
