import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import Vta from '../components/VTA';
import PersonInfo from '../components/PersonInfo';
import InfoMeldinger from '../components/InfoMeldinger';
import DittnavFliser from '../components/DittnavFliser';
import DittnavLenkePanel from '../components/DittnavLenkePanel';
import Lenkelister from '../components/Lenkelister';
import DelayedSpinner from '../components/DelayedSpinner';
import Config from '../Config';

const NUM_ENDPOINTS = 7;

class Home extends Component {
  render() {
    const { oppfolging, meldekort, person, identifikator, paabegynteSoknader, mininnboks, sakstema, fetching } = this.props;
    const erUnderOppfolging = oppfolging && oppfolging.erBrukerUnderOppfolging;
    const tjenesterEllerVta = erUnderOppfolging ? <Vta /> : <DittnavFliser />;
    const oppfolgingsLenker = Config.dittNav.OPPFOLGINGS_LENKER;
    const generelleLenker = Config.dittNav.GENERELLE_LENKER;

    return (
      <>
        <div className="row">
          <div className="maincontent side-innhold">
            <div className="col-md-12" id="dittnav-main-container">
              <PersonInfo person={person} identifikator={identifikator} />
              { fetching < NUM_ENDPOINTS ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null }
              <InfoMeldinger meldekort={meldekort} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} />
              <DittnavLenkePanel sakstema={sakstema} />
              {tjenesterEllerVta}
              <Undertittel className="relatert-informasjon__subheader">
                <F id="relatertInformasjon.header" />
              </Undertittel>
              { erUnderOppfolging ? <Lenkelister links={oppfolgingsLenker} /> : <Lenkelister links={generelleLenker} /> }
            </div>
          </div>
        </div>
      </>
    );
  }
}

Home.propTypes = {
  oppfolging: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  meldekort: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  person: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  identifikator: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  paabegynteSoknader: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  mininnboks: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  sakstema: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  fetching: PropTypes.number.isRequired,
};

Home.defaultProps = {
  oppfolging: null,
  meldekort: null,
  person: null,
  identifikator: null,
  paabegynteSoknader: null,
};

export default Home;
