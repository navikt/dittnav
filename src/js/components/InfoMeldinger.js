import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Brukernotifikasjoner from './Brukernotifikasjoner';
import PaabegynteSoknader from './meldinger/PaabegynteSoknader';
import Meldekort from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks from './meldinger/MinInnboks';
import InngangVarslinger from './InngangVarslinger';
import PaabegynteSoknaderType from '../types/PaabegynteSoknaderType';
import MeldekortType from '../types/MeldekortType';
import MinInnboksType from '../types/MinInnboksType';
import InnloggingsstatusType from '../types/InnloggingsstatusType';
import BeskjedType from '../types/BeskjedType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import useInngang from '../hooks/useInngang';

const InfoMeldinger = (props) => {
  const [visInngangTilVarslinger] = useInngang(props.inaktiveBeskjeder, props.inaktiveOppgaver, props.inaktiveInnbokser);
  const isMeldeKortUser = props.meldekort ? props.meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <Brukernotifikasjoner
        beskjeder={props.beskjeder}
        oppgaver={props.oppgaver}
        innbokser={props.innbokser}
        innloggingsstatus={props.innloggingsstatus}
      />
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={props.meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={props.meldekort} />
      <PaabegynteSoknader paabegynteSoknader={props.paabegynteSoknader} />
      <MinInnboks mininnboks={props.mininnboks} />
      {visInngangTilVarslinger ? <InngangVarslinger /> : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  innloggingsstatus: InnloggingsstatusType,
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  inaktiveBeskjeder: arrayOf(BeskjedType),
  inaktiveOppgaver: arrayOf(OppgaveType),
  inaktiveInnbokser: arrayOf(InnboksType),
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  innloggingsstatus: null,
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  inaktiveBeskjeder: null,
  inaktiveOppgaver: null,
  inaktiveInnbokser: null,
};

export default InfoMeldinger;
