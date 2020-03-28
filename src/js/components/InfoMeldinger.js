import React from 'react';
import moment from 'moment';
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
import BeskjedType from '../types/BeskjedType';
import OppgaverType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import SakstemaType from '../types/SakstemaType';

const InfoMeldinger = ({ sakstema, meldekort, paabegynteSoknader, mininnboks, innlogging, beskjeder, oppgaver, innbokser }) => {
  const isMeldeKortUser = meldekort ? meldekort.meldekortbruker : false;

  const naaTid = moment();
  const harDagpengerSakSiste14Dager = sakstema.sakstemaList
    .some(tema => tema.temakode === 'DAG' && naaTid.diff(moment(tema.sisteOppdatering), 'days') <= 14);

  return (
    <section className="infomeldinger-list">
      <h1 className="skjermleser"><F id="dittnav.infomeldinger.varsler" /></h1>
      <InformasjonsMeldinger isMeldeKortUser={isMeldeKortUser} visForskuddsInfo={harDagpengerSakSiste14Dager} />
      {isMeldeKortUser ? <Meldekort meldekort={meldekort} /> : null}
      <EtterregistreringMeldekort ettereg={meldekort} />
      <PaabegynteSoknader paabegynteSoknader={paabegynteSoknader} />
      <MinInnboks mininnboks={mininnboks} />
      {Config.HENDELSER_FEATURE_TOGGLE
        ? <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
        : null}
    </section>
  );
};

InfoMeldinger.propTypes = {
  meldekort: MeldekortType,
  paabegynteSoknader: PaabegynteSoknaderType,
  mininnboks: MinInnboksType,
  innlogging: InnloggingType,
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  sakstema: SakstemaType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  mininnboks: [],
  innlogging: null,
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  sakstema: null,
};

export default InfoMeldinger;
