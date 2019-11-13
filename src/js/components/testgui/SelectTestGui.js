import React from 'react';
import { Select } from 'nav-frontend-skjema';
import PropTypes from 'prop-types';

const SelectTestGui = ({ setValg }) => {
  const selectHendelse = (valg) => (
    setValg(valg)
  );

  return (
    <Select label="Velg hendelse:" onChange={(e) => selectHendelse(e.target.value)}>
      <option value="informasjon">Informasjon</option>
      <option value="oppgave">Oppgave</option>
      <option value="melding">Melding</option>
    </Select>
  );
};

SelectTestGui.propTypes = {
  setValg: PropTypes.func.isRequired,
};

export default SelectTestGui;
