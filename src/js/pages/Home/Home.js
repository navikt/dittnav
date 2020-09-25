import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Config from '../../globalConfig';
import useStore from '../../hooks/useStore';
import Vta from '../../components/VTA';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import DittnavFliser from '../../components/DittnavFliser';
import KoronaSpesial from '../../components/korona-spesial/KoronaSpesial';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/DelayedSpinner';
import PageBase from '../PageBase';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import useModal from '../../hooks/useModal';

const Home = () => {
  const [handleModal] = useModal();
  const { state } = useStore();

  const erUnderOppfolging = state.oppfolging && state.oppfolging.erBrukerUnderOppfolging;
  const generelleEllerVta = erUnderOppfolging ? <Vta /> : <DittnavFliser />;
  const loading = false; // TODO: state.loading
  const oppfolgingHasLoaded = true; // TODO: tate.oppfolgingHasLoaded
  const uniqueErrors = []; // TODO: state.error

  if (state.visInnloggingsModal) {
    return (<InnloggingsModal onClick={handleModal} isOpen />);
  }
  // TODO: fix antallBrukernotifikasjoner
  return (
    <PageBase uniqueErrors={uniqueErrors}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <PersonInfo person={state.navn} identifikator={state.ident} />
            {loading ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <InfoMeldinger
              meldekort={state.meldekort}
              paabegynteSoknader={state.paabegynteSoknader}
              mininnboks={state.meldinger}
              innloggingsstatus={state.innloggingsstatus}
              oppgaver={state.oppgaver}
              innbokser={state.innbokser}
              antallBrukernotifikasjoner={state.antallBrukernotifikasjoner}
            />
            <KoronaSpesial
              sakstema={state.sakstema}
              isLoaded={!loading}
            />
            <DittnavLenkePanel sakstema={state.sakstema} />
            {oppfolgingHasLoaded ? generelleEllerVta : null}
            <Undertittel className="flere-tjenester__subheader">
              <F id="flere.tjenester.header" />
            </Undertittel>
            {erUnderOppfolging
              ? <Lenkelister links={Config.dittNav.OPPFOLGINGS_LENKER} />
              : <Lenkelister links={Config.dittNav.GENERELLE_LENKER} />}
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Home;
