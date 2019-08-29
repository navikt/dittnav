import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import Informasjon from './hendelser/Informasjon';
import Config from '../Config';
import Api from '../Api';

const Hendelser = () => {
  const [hendelser, setHendelser] = useState([]);

  const getInformasjonHendelser = () => {
    return Api
      .fetchHendelser(Config.dittNav.DITTNAV_HENDELSER_URL)
      .then((r) => {
        setHendelser(r);
      });
  };

  return (
    <div className="Hendelser">
      <Knapp onClick={() => (getInformasjonHendelser())}>Hent hendelser</Knapp>
      {hendelser.map(h => (
        <Informasjon hendelse={h} />
      ))}
    </div>
  );
};

export default Hendelser;
