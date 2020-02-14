import React, { useEffect, useState } from 'react';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import HendelseContext from '../../context/HendelseContext';
import ApiType from '../../types/ApiType';

const VarslingerRender = ({ api }) => {
  const [data, setData] = useState({ hendelser: [], errors: [] });

  const handleError = (e) => {
    setData(d => ({ ...d, fetching: d.fetching + 1 }));

    if (e.status === 401) {
      return;
    }

    setData(d => ({ ...d, errors: [...d.errors, 'error.baksystemer'] }));
  };

  const updateHendelser = (h) => (
    setData(d => ({ ...d, hendelser: h }))
  );

  useEffect(
    () => {
      api.fetchHendelser()
        .then((r) => {
          setData(d => ({ ...d, hendelser: r }));
        }).catch(handleError);
    }, [],
  );

  const uniqueErrors = data.errors.filter((item, i, ar) => ar.indexOf(item) === i);

  return (
    <HendelseContext.Provider value={updateHendelser}>
      <PageFrame uniqueErrors={uniqueErrors}>
        <Varslinger hendelser={data.hendelser} />
      </PageFrame>
    </HendelseContext.Provider>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
