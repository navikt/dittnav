import React from 'react';
import PropTypes from 'prop-types';

const PersonInfo = ({ person, identifikator }) => {
  if (!person && !identifikator) return null;
  const info = person && person.navn ? person.navn.toLowerCase() : identifikator.ident;

  return (
    <div className="person-info">
      <h1 className="person-info">
        {info}
      </h1>
    </div>
  );
};

PersonInfo.propTypes = {
  person: PropTypes.shape({
    navn: PropTypes.string.isRequired,
  }),
  identifikator: PropTypes.shape({
    ident: PropTypes.number.isRequired,
  }),
};

PersonInfo.defaultProps = {
  person: null,
  identifikator: null,
};

export default PersonInfo;
