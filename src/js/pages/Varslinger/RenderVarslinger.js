import React, { useEffect, useState } from 'react';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import HendelseContext from '../../context/HendelseContext';
import ApiType from '../../types/ApiType';

const VarslingerRender = ({ api }) => {
  const [hendelser, setHendelser] = useState([]);
  const [error, setError] = useState([]);

  const handleError = () => {
    setError(['error.baksystemer']);
  };

  const updateHendelser = (h) => (
    setHendelser(h)
  );

  useEffect(
    () => {
      api.fetchHendelser()
        .then((r) => {
          setHendelser(r);
        }).catch(handleError);
    }, [],
  );

  return (
    <HendelseContext.Provider value={updateHendelser}>
      <PageFrame uniqueErrors={error}>
        <Varslinger hendelser={hendelser} />
      </PageFrame>
    </HendelseContext.Provider>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
