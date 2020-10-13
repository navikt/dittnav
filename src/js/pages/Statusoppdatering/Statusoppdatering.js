import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import StatusoppdateringForm from './Form/StatusoppdateringForm';

const Statusoppdatering = () => (
  <div className="testpage-content">
    <Panel className="testpage-panel" border>
      <div className="testpage-panel__tittel-box">
        <Innholdstittel className="testpage-panel__tittel">
          <F id="statusoppdatering.tittel" />
        </Innholdstittel>
      </div>
      <StatusoppdateringForm />
    </Panel>
  </div>
);

export default Statusoppdatering;
