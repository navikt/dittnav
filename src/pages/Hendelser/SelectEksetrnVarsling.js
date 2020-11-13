import React from 'react';
import { Select } from 'nav-frontend-skjema';
import PropTypes from 'prop-types';

const SelectEksternVarsling = ({ setEksternVarsling }) => {
  const selectEksternVarsling = (valg) => (
    setEksternVarsling(valg)
  );

  return (
    <Select label="Ekstern varsling:" onChange={(e) => selectEksternVarsling(e.target.value)}>
      <option value="false">False</option>
      <option value="true">True</option>
    </Select>
  );
};

SelectEksternVarsling.propTypes = {
  setEksternVarsling: PropTypes.func.isRequired,
};

export default SelectEksternVarsling;
