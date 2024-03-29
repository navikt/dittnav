import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import useInngang from '../hooks/useInngang';
import useBrukernotifikasjoner from '../hooks/useBrukernotifikasjoner';
import useInaktiveBrukernotifikasjoner from '../hooks/useInaktiveBrukernotifikasjoner';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Brukernotifikasjoner from './Brukernotifikasjoner';
import Meldekort from './meldinger/meldekort/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import InngangVarslinger from './InngangVarslinger';

const InfoMeldinger = () => {
  const [beskjeder, { data: oppgaver }, { data: innbokser }] = useBrukernotifikasjoner();
  const [inaktiveBeskjeder, { data: inaktiveOppgaver }, { data: inaktiveInnbokser }] = useInaktiveBrukernotifikasjoner();
  const [visInngangTilVarslinger] = useInngang(inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser);

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <Meldekort />
      <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} erAktiv />
      <InformasjonsMeldinger />
      <EtterregistreringMeldekort />
      {visInngangTilVarslinger ? <InngangVarslinger /> : null}
    </section>
  );
};

export default InfoMeldinger;
