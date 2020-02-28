import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import Config from '../globalConfig';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import PaabegynteSoknader from './meldinger/PaabegynteSoknader';
import PaabegynteSoknaderType from '../types/PaabegynteSoknaderType';
import Meldekort from './meldinger/meldekort/Meldekort';
import MeldekortType from '../types/MeldekortType';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks from './meldinger/MinInnboks';
import MinInnboksType from '../types/MinInnboksType';
import Hendelser from './meldinger/Hendelser';
import HendelserType from '../types/HendelserType';

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks, hendelser }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      {Config.HENDELSER_FEATURE_TOGGLE ? <Hendelser hendelser={hendelser} /> : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  hendelser: HendelserType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  hendelser: null,
};

export default InfoMeldinger;
