import React from 'react';
import PropTypes from 'prop-types';
import Api from '../Api';
import Unleash from './Unleash';
import PaabegynteSoknader, { PaabegynteSoknaderType } from './meldinger/PaabegynteSoknader';
import Meldekort, { MeldekortType } from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks, { MinInnboksType } from './meldinger/MinInnboks';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Hendelser from './meldinger/Hendelser';

const UnleashWrapper = ({ isFeatureEnabled }) => (
  <>
    {isFeatureEnabled ? <Hendelser /> : null}
  </>
);

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      <Unleash api={Api} feature="dittnav.hendelser">
        <UnleashWrapper />
      </Unleash>
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
};

UnleashWrapper.propTypes = {
  isFeatureEnabled: PropTypes.number.isRequired,
};

export default InfoMeldinger;
