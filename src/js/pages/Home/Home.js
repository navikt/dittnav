import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { useIsFetching } from 'react-query';
import { useOppfolging } from '../../hooks/api/usePerson';
import useStore from '../../hooks/useStore';
import Vta from '../../components/VTA';
import PageBase from '../PageBase';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import DittnavFliser from '../../components/DittnavFliser';
import KoronaSpesial from '../../components/korona-spesial/KoronaSpesial';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/DelayedSpinner';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import Brodsmuler from '../../utils/brodsmuler';
import { generelleLenker, oppfolgingsLenker } from '../../utils/lenker';

const Home = () => {
  const [{ data: oppfolging, isLoading: oppfolgingIsLoading, isError: oppfolgingIsError }] = useOppfolging();
  const isFetching = useIsFetching();
  const { state } = useStore();

  const erUnderOppfolging = oppfolging && oppfolging.content && oppfolging.content.erBrukerUnderOppfolging;
  const generelleEllerVta = erUnderOppfolging ? <Vta /> : <DittnavFliser />;

  if (state.visInnloggingsModal) {
    return (<InnloggingsModal onClick={() => null} isOpen />);
  }

  return (
    <PageBase uniqueErrors={state.error} breadcrumbs={Brodsmuler.dittnav}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <PersonInfo />
            {isFetching ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <InfoMeldinger />
            <KoronaSpesial isLoaded={!isFetching} />
            <DittnavLenkePanel />
            {!oppfolgingIsLoading || oppfolgingIsError ? generelleEllerVta : null}
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
