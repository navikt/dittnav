import React from 'react';
import { shape, arrayOf, any, bool } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import Vta from '../../components/VTA';
import PersonInfo from '../../components/PersonInfo';
import InfoMeldinger from '../../components/InfoMeldinger';
import DittnavFliser from '../../components/DittnavFliser';
import DittnavLenkePanel from '../../components/DittnavLenkePanel';
import Lenkelister from '../../components/Lenkelister';
import DelayedSpinner from '../../components/DelayedSpinner';
import Config from '../../globalConfig';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';
import OppgaveType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';
import KoronaSpesial from "../../components/korona-spesial/KoronaSpesial";

const Home = ({ data, loading }) => {
  const erUnderOppfolging = data.oppfolging && data.oppfolging.erBrukerUnderOppfolging;
  const generelleEllerVta = erUnderOppfolging ? <Vta /> : <DittnavFliser />;
  const oppfolgingsLenker = Config.dittNav.OPPFOLGINGS_LENKER;
  const generelleLenker = Config.dittNav.GENERELLE_LENKER;

  return (
    <>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <PersonInfo person={data.person} identifikator={data.identifikator} />
            {loading ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <InfoMeldinger
              sakstema={data.sakstema}
              meldekort={data.meldekort}
              paabegynteSoknader={data.paabegynteSoknader}
              mininnboks={data.mininnboks}
              innlogging={data.innlogging}
              beskjeder={data.beskjeder}
              oppgaver={data.oppgaver}
              innbokser={data.innbokser}
            />
            <KoronaSpesial
              sakstema={data.sakstema}
              beskjeder={data.beskjeder.concat(data.inaktiveBeskjeder || [])}
            />
            <DittnavLenkePanel sakstema={data.sakstema} />
            {data.oppfolgingHasLoaded ? generelleEllerVta : null}
            <Undertittel className="flere-tjenester__subheader">
              <F id="flere.tjenester.header" />
            </Undertittel>
            {erUnderOppfolging
              ? <Lenkelister links={oppfolgingsLenker} />
              : <Lenkelister links={generelleLenker} />}
          </div>
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  data: shape({
    oppfolging: any, // eslint-disable-line react/forbid-prop-types
    meldekort: any, // eslint-disable-line react/forbid-prop-types
    person: any, // eslint-disable-line react/forbid-prop-types
    identifikator: any, // eslint-disable-line react/forbid-prop-types
    paabegynteSoknader: any, // eslint-disable-line react/forbid-prop-types
    mininnboks: any.isRequired, // eslint-disable-line react/forbid-prop-types
    sakstema: any.isRequired, // eslint-disable-line react/forbid-prop-types
    oppfolgingHasLoaded: any.isRequired, // eslint-disable-line react/forbid-prop-types
    beskjeder: arrayOf(BeskjedType),
    oppgaver: arrayOf(OppgaveType),
    innbokser: arrayOf(InnboksType),
    innlogging: InnloggingType,
  }),
  loading: bool.isRequired,
};

Home.defaultProps = {
  data: shape({
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    innlogging: null,
    beskjeder: null,
    oppgaver: null,
    innbokser: null,
  }),
};

export default Home;
