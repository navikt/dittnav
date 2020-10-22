import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage } from 'react-intl';

const Dokumentpanel = () => (
  <Panel className="sakspanel tidslinje">
    <div className="sakspanel-container">
      <Systemtittel className="dokument-tittel">
        <FormattedMessage id="tidslinje.dokumenttittel" />
      </Systemtittel>
      <ul className="dokument-lenke-liste">
        <li className="dokument-lenke">
          <Lenke href="#">
            <FormattedMessage id="tidslinje.dokumentlenke.kvittering" />
          </Lenke>
        </li>
        <li className="dokument-lenke">
          <Lenke href="#">
            <FormattedMessage id="tidslinje.dokumentlenke.soknad" />
          </Lenke>
        </li>
        <li className="dokument-lenke">
          <Lenke href="#">
            <FormattedMessage id="tidslinje.dokumentlenke.vedlegg" />
          </Lenke>
        </li>
      </ul>
    </div>
  </Panel>
);

export default Dokumentpanel;
