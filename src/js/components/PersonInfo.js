import React from 'react';
import PropTypes from 'prop-types';
import Personikon from '../../images/person.svg';

const PersonInfo = ({ person, identifikator }) => {
  if (!person && !identifikator) return null;
  const info = person && person.navn ? person.navn.toLowerCase() : identifikator.ident;

  return (
    <div className="person-info">
      <img className="person-info__ikon" src={Personikon} alt="" />
      <h1>{info}</h1>
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
