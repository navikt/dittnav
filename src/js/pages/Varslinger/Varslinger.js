import React from 'react';
import PropTypes from 'prop-types';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Config from '../../Config';
import Hendelser from '../../components/meldinger/Hendelser';

const Varslinger = ({ hendelser, updateHendelser }) => (
  <div className="row">
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <section className="infomeldinger-list">
          <AlertStripe type="advarsel" className="infomelding">
            <Undertittel>
              <FormattedMessage id="varslinger.under.utvikling.tittel" />
            </Undertittel>
            <Normaltekst>
              <FormattedMessage
                id="varslinger.under.utvikling.ingress"
                values={{
                  innboks: <Lenke id="alert-lenke-id" href={Config.LENKER.innboks.url}>innboksen</Lenke>,
                  saksoversikt: <Lenke id="alert-lenke-id" href={Config.LENKER.saksoversikt.url}>Dine saker</Lenke>,
                }}
              />
            </Normaltekst>
          </AlertStripe>
          <Hendelser hendelser={hendelser} updateHendelser={updateHendelser} />
        </section>
      </div>
    </div>
  </div>
);

Varslinger.propTypes = {
  hendelser: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  updateHendelser: PropTypes.func.isRequired,
};

Varslinger.defaultProps = {
  hendelser: null,
};

export default Varslinger;
