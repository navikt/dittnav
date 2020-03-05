import React, { useEffect, useState } from 'react';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import HendelseContext from '../../context/HendelseContext';
import ApiType from '../../types/ApiType';

const VarslingerRender = ({ api }) => {
  const [hendelser, setHendelser] = useState(null);
  const [innlogging, setInnlogging] = useState(null);
  const [error, setError] = useState([]);

  const handleError = () => {
    setError(['error.baksystemer']);
  };

  useEffect(
    () => {
      api.fetchHendelser()
        .then((r) => {
          setHendelser(r);
        }).catch(handleError);
      api.fetchInnlogging()
        .then((r) => {
          setInnlogging(r);
        }).catch(handleError);
    }, [],
  );

  return (
    <HendelseContext.Provider value={setHendelser}>
      <PageFrame uniqueErrors={error}>
        <Varslinger hendelser={hendelser} innlogging={innlogging} />
      </PageFrame>
    </HendelseContext.Provider>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
