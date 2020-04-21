import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';
import BrodSmule from './BrodSmule';
import Ikon from '../../../assets/hjem.svg';

const Brodsmulesti = ({ intl }) => (
  <nav aria-label={intl.formatMessage({ id: 'brodsmulesti.skjermleser' })}>
    <img className="brodsmulesti-ikon" src={Ikon} alt="" />
    <ol className="brodsmulesti">
      <li className="brodsmule">
        <Link className="lenke" to="/dittnav">
          <FormattedMessage id="brodsmulesti.dittnav" />
        </Link>
        <span className="brodsmule__deler" aria-hidden="true">/</span>
      </li>
      <BrodSmule />
    </ol>
  </nav>
);

Brodsmulesti.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Brodsmulesti);
