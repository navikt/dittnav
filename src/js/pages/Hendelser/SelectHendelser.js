import React from 'react';
import { Select } from 'nav-frontend-skjema';
import PropTypes from 'prop-types';

const SelectHendelser = ({ setValg }) => {
  const selectHendelse = (valg) => (
    setValg(valg)
  );

  return (
    <Select label="Velg hendelse:" onChange={(e) => selectHendelse(e.target.value)}>
      <option value="beskjed">Beskjed</option>
      <option value="oppgave">Oppgave</option>
      <option value="innboks">Innboks</option>
    </Select>
  );
};

SelectHendelser.propTypes = {
  setValg: PropTypes.func.isRequired,
};

export default SelectHendelser;
