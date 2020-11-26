import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Systemtittel, Element } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Oppgave from '../../../components/brukernotifikasjoner/Oppgave';
import Beskjed from '../../../components/brukernotifikasjoner/Beskjed';

const Statuspanel = () => (
  <Panel className="sakspanel tidslinje">
    <div className="statuspanel-container">
      <Systemtittel className="status-tittel">
        <FormattedMessage id="tidslinje.statustittel" />
      </Systemtittel>
      <Element className="dato-etikett">
        <FormattedMessage id="tidslinje.status.dato" />
      </Element>
      <Beskjed beskjed={{
        uid: '123',
        eventId: '123',
        tekst: 'Vi har mottatt din søknad om arbeidsavklaringspenger',
        sikkerhetsnivaa: '4',
        link: 'https:///dummyUrl.n0',
      }}
      />
      <Oppgave oppgave={{
        eventId: '123',
        tekst: 'Vi mangler vedlegg for å kunne behandle søknaden din om arbeidsavklaringspenger',
        sikkerhetsnivaa: '4',
        link: 'https:///dummyUrl.n0',
      }}
      />
    </div>
  </Panel>
);

export default Statuspanel;
