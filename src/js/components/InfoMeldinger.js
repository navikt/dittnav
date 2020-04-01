import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import Config from '../globalConfig';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Brukernotifikasjoner from './Brukernotifikasjoner';
import PaabegynteSoknader from './meldinger/PaabegynteSoknader';
import Meldekort from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks from './meldinger/MinInnboks';
import PaabegynteSoknaderType from '../types/PaabegynteSoknaderType';
import MeldekortType from '../types/MeldekortType';
import MinInnboksType from '../types/MinInnboksType';
import InnloggingType from '../types/InnloggingType';
import OppgaverType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import useBeskjedStore from '../hooks/useBeskjedStore';

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks, innlogging, oppgaver, innbokser }) => {
  const { state } = useBeskjedStore();
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      {Config.HENDELSER_FEATURE_TOGGLE
        ? (
          <Brukernotifikasjoner
            beskjeder={state.beskjeder}
            oppgaver={oppgaver}
            innbokser={innbokser}
            innlogging={innlogging}
          />
        ) : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  innlogging: InnloggingType,
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  innlogging: null,
  oppgaver: null,
  innbokser: null,
};

export default InfoMeldinger;
