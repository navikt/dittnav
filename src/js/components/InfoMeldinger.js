import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import useBeskjedStore from '../hooks/useBeskjedStore';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Brukernotifikasjoner from './Brukernotifikasjoner';
import PaabegynteSoknader from './meldinger/PaabegynteSoknader';
import Meldekort from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks from './meldinger/MinInnboks';
import InngangVarslinger from './InngangVarslinger';
import isEmpty from '../utils/Array';
import PaabegynteSoknaderType from '../types/PaabegynteSoknaderType';
import MeldekortType from '../types/MeldekortType';
import MinInnboksType from '../types/MinInnboksType';
import InnloggingType from '../types/InnloggingType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';

const InfoMeldinger = (props) => {
  const { state } = useBeskjedStore();
  const isMeldeKortUser = props.meldekort ? props.meldekort.meldekortbruker : false;

  const visInngangTilVarslinger = (state.inaktiveBeskjeder && !isEmpty(state.inaktiveBeskjeder))
    || (props.inaktiveOppgaver && !isEmpty(props.inaktiveOppgaver))
    || (props.inaktiveInnbokser && !isEmpty(props.inaktiveInnbokser));

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <Brukernotifikasjoner
        beskjeder={state.beskjeder}
        oppgaver={props.oppgaver}
        innbokser={props.innbokser}
        innlogging={props.innlogging}
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
  innlogging: InnloggingType,
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  inaktiveOppgaver: arrayOf(OppgaveType),
  inaktiveInnbokser: arrayOf(InnboksType),
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  innlogging: null,
  oppgaver: null,
  innbokser: null,
  inaktiveOppgaver: null,
  inaktiveInnbokser: null,
};

export default InfoMeldinger;
