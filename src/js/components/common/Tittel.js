import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const Tittel = ({ tittelId, className }) => (
  <div className={className}>
    <Sidetittel>
      <FormattedMessage id={tittelId} />
    </Sidetittel>
  </div>
);

Tittel.propTypes = {
  tittelId: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Tittel.defaultProps = {
  className: '',
};

export default Tittel;
