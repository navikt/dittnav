import React from 'react';
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
import HendelserType from '../types/HendelserType';
import InnloggingType from '../types/InnloggingType';

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks, hendelser, innlogging }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      {Config.HENDELSER_FEATURE_TOGGLE ? <Brukernotifikasjoner hendelser={hendelser} innlogging={innlogging} /> : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  hendelser: HendelserType,
  innlogging: InnloggingType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  hendelser: null,
  innlogging: null,
};

export default InfoMeldinger;
