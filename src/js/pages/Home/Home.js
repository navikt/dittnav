import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { generelleLenker, oppfolgingsLenker } from '../../utils/lenker';
import useStore from '../../hooks/useStore';
import Vta from '../../components/VTA';
import PageBase from '../PageBase';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import DittnavFliser from '../../components/DittnavFliser';
import KoronaSpesial from '../../components/korona-spesial/KoronaSpesial';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/common/DelayedSpinner';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import Brodsmuler from '../../utils/brodsmuler';

const Home = () => {
  const { state } = useStore();
  const erUnderOppfolging = state.oppfolging.data && state.oppfolging.data.erBrukerUnderOppfolging;
  const generelleEllerVta = erUnderOppfolging ? <Vta /> : <DittnavFliser />;
  const isLoading = Object.keys(state).some((key) => state[key].loading);

  if (state.visInnloggingsModal) {
    return (<InnloggingsModal onClick={() => null} isOpen />);
  }

  return (
    <PageBase uniqueErrors={state.error} breadcrumbs={Brodsmuler.dittnav}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <PersonInfo person={state.navn.data} identifikator={state.ident.data} />
            {isLoading ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <InfoMeldinger
              meldekort={state.meldekort.data}
              paabegynteSoknader={state.paabegynteSoknader.data}
              mininnboks={state.meldinger.data}
              innloggingsstatus={state.innloggingsstatus.data}
              beskjeder={state.beskjeder.data}
              oppgaver={state.oppgaver.data}
              innbokser={state.innbokser.data}
              inaktiveBeskjeder={state.inaktiveBeskjeder.data}
              inaktiveOppgaver={state.inaktiveOppgaver.data}
              inaktiveInnbokser={state.inaktiveInnbokser.data}
            />
            <KoronaSpesial
              sakstema={state.sakstema.data}
              isLoaded={!isLoading}
            />
            <DittnavLenkePanel sakstema={state.sakstema.data} />
            {!state.oppfolging.loading || state.oppfolging.failed ? generelleEllerVta : null}
            <Undertittel className="flere-tjenester__subheader">
              <F id="flere.tjenester.header" />
            </Undertittel>
            {erUnderOppfolging
              ? <Lenkelister links={oppfolgingsLenker} />
              : <Lenkelister links={generelleLenker} />}
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Home;
