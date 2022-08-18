import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import { useIsFetching, useQuery } from 'react-query';
import { useOppfolging } from '../../hooks/usePerson';
import { generelleLenker, oppfolgingsLenker } from '../../utils/lenker';
import useStore from '../../hooks/useStore';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/common/DelayedSpinner';
import InnloggingsModal from '../../components/common/InnloggingsModal';
import Brodsmuler from '../../utils/brodsmuler';
import Vta from '../../components/VTA';
import PageBase from '../PageBase';
import DittnavFliser from '../../components/DittnavFliser';
import UnleashWrapper from '../../components/UnleashWrapper';
import { fetchUnleashToggle } from '../../Api';

const Home = () => {
  const [{ data: oppfolging, isLoading: oppfolgingIsLoading, isError: oppfolgingIsError }] = useOppfolging();
  const { data: minSideToggle } = useQuery('minside', fetchUnleashToggle);
  const isFetching = useIsFetching();
  const { state } = useStore();

  const erUnderOppfolging = oppfolging && oppfolging.content && oppfolging.content.erBrukerUnderOppfolging;
  const generelleEllerVta = oppfolgingIsError ? <DittnavFliser /> : <Vta key='vta-for-resten' />;

  if (minSideToggle?.content === true) {
    window.location.assign(`${window.env.NAVNO_URL}/minside`);
  }

  const NyVtaForStandardInnsats = ({ isLoading, isError }) => {
    if (isLoading || isError) return null;
    return (
      <UnleashWrapper toggle='situasjon'>
        <Vta kreverStandardInnsatsgruppe key='vta-for-standard' />
      </UnleashWrapper>
    )
  }

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
            <NyVtaForStandardInnsats isLoading={oppfolgingIsLoading} isError={oppfolgingIsError} />
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
