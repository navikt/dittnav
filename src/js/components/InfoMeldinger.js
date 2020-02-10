import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import PaabegynteSoknader, { PaabegynteSoknaderType } from './meldinger/PaabegynteSoknader';
import Meldekort, { MeldekortType } from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks, { MinInnboksType } from './meldinger/MinInnboks';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Hendelser from './meldinger/Hendelser';
import Config from '../globalConfig';

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks, hendelser, updateHendelser }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      {Config.HENDELSER_FEATURE_TOGGLE ? <Hendelser hendelser={hendelser} updateHendelser={updateHendelser} /> : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  hendelser: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
  updateHendelser: PropTypes.func.isRequired,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  hendelser: null,
};

export default InfoMeldinger;
