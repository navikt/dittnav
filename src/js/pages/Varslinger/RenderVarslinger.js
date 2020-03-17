import React, { useEffect, useState } from 'react';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import HendelseContext from '../../context/HendelseContext';
import ApiType from '../../types/ApiType';

const VarslingerRender = ({ api }) => {
  const [beskjeder, setBeskjeder] = useState(null);
  const [oppgaver, setOppgaver] = useState(null);
  const [innbokser, setInnbokser] = useState(null);
  const [innlogging, setInnlogging] = useState(null);
  const [error, setError] = useState([]);

  const handleError = () => {
    setError(['error.baksystemer']);
  };

  useEffect(
    () => {
      api.fetchBeskjeder()
        .then((r) => {
          setBeskjeder(r);
        }).catch(handleError);

      api.fetchOppgaver()
        .then((r) => {
          setOppgaver(r);
        }).catch(handleError);

      api.fetchInnbokser()
        .then((r) => {
          setInnbokser(r);
        }).catch(handleError);

      api.fetchInnlogging()
        .then((r) => {
          setInnlogging(r);
        }).catch(handleError);
    }, [],
  );

  return (
    <HendelseContext.Provider value={setBeskjeder}>
      <PageFrame uniqueErrors={error}>
        <Varslinger beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
      </PageFrame>
    </HendelseContext.Provider>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
