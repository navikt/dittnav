import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { useIsFetching } from 'react-query';
import moment from 'moment';
import { useOppfolging } from '../../hooks/usePerson';
import { generelleLenker, oppfolgingsLenker } from '../../utils/lenker';
import useStore from '../../hooks/useStore';
import { useSakstema } from '../../hooks/useSaker';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import KoronaSpesial from '../../components/korona-spesial/KoronaSpesial';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/common/DelayedSpinner';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import Brodsmuler from '../../utils/brodsmuler';
import Vta from '../../components/VTA';
import PageBase from '../PageBase';
import DittnavFliser from '../../components/DittnavFliser';

const Home = () => {
  const [{ data: oppfolging, isLoading: oppfolgingIsLoading, isError: oppfolgingIsError }] = useOppfolging();
  const isFetching = useIsFetching();
  const { state } = useStore();
  const [{ data: dagpengerSistEndret }] = useSakstema();
  const [showCoronaSpesial, setShowCoronaSpesial] = useState(false);

  const visForskuddLenkeFra = '01-03-2020';
  const erUnderOppfolging = oppfolging && oppfolging.content && oppfolging.content.erBrukerUnderOppfolging;
  const generelleEllerVta = oppfolgingIsError ? <DittnavFliser /> : <Vta />;

  if (state.visInnloggingsModal) {
    return (<InnloggingsModal onClick={() => null} isOpen />);
  }

  useEffect(() => {
    if (dagpengerSistEndret !== undefined) {
      if (moment(dagpengerSistEndret.content.dagpengerSistEndret).isAfter(moment(visForskuddLenkeFra, 'DD-MM-YYYY'))) {
        setShowCoronaSpesial(true);
      }
    }
  }, [dagpengerSistEndret]);

  return (
    <PageBase uniqueErrors={state.error} breadcrumbs={Brodsmuler.dittnav}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <PersonInfo />
            {isFetching ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <InfoMeldinger />
            {showCoronaSpesial ? <KoronaSpesial /> : null}
            <DittnavLenkePanel />
            {oppfolgingIsLoading ? null : generelleEllerVta}
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
