import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import PaabegynteSoknader, { PaabegynteSoknaderType } from './meldinger/PaabegynteSoknader';
import Meldekort, { MeldekortType } from './Meldekort';
import MinInnboks, { MinInnboksType } from './meldinger/MinInnboks';
import EtterregistreringMeldekort from './EtterregistreringMeldekort';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';

const InfoMeldinger = ({ meldekort, paabegynteSoknader, mininnboks }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  return (
    <section className="infomeldinger-list">
      <h1 className="vekk"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} />
      <Meldekort meldekort={meldekort} />
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
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

export default InfoMeldinger;
