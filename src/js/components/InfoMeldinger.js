import React from 'react';
import { arrayOf, number } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import useBeskjedStore from '../hooks/useBeskjedStore';
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
import InnloggingType from '../types/InnloggingType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';

const InfoMeldinger = (props) => {
  const { state } = useBeskjedStore();
  const isMeldeKortUser = props.meldekort ? props.meldekort.meldekortbruker : false;
  const visInngangTilVarslinger = props.antallBrukernotifikasjoner > 0;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <Brukernotifikasjoner
        beskjeder={state.beskjeder}
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
  innloggingsstatus: InnloggingType,
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  antallBrukernotifikasjoner: number,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  innloggingsstatus: null,
  oppgaver: null,
  innbokser: null,
  antallBrukernotifikasjoner: 0,
};

export default InfoMeldinger;
