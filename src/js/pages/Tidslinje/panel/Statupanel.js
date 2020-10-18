import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

const StatusPanel = () => (
  <Panel className="sakspanel tidslinje">
    <div className="sakspanel-container">
      <Systemtittel className="dokumenter-tittel">
        Dokumenter
      </Systemtittel>
      <ul className="dokument-lenke-liste">
        <li className="dokument-lenke">
          <Lenke href="#"> Kvittering på innsendt søknad
          </Lenke>
        </li>
        <li className="dokument-lenke">
          <Lenke href="#"> Søknad om arbeidsavklaringspenger (Send av deg 8. mai 2020 kl. 15:39)
          </Lenke>
        </li>
        <li className="dokument-lenke">
          <Lenke href="#"> Vedlegg til søknad: inntektsopplysninger.pdf</Lenke>
        </li>
      </ul>
    </div>
  </Panel>
);

export default StatusPanel;
