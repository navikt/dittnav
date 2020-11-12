import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';

const FeilMeldinger = ({ errors }) => (
  <>
    {errors.length > 0 && (
      <section className="service-notification">
        <h1 className="typo-element">
          {errors.map(e => (<span key={e}><F id={e} /></span>))}
        </h1>
      </section>
    )}
  </>
);

FeilMeldinger.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

FeilMeldinger.defaultProps = {
  errors: [],
};

export default FeilMeldinger;
