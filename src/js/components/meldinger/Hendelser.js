import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import { IkonInformasjon, LenkepanelMedIkon } from '../LenkepanelMedIkon';

const getInformasjonHendelser = (setHendelser) => Api
  .fetchHendelser()
  .then((r) => {
    setHendelser(r);
  });

const Hendelser = () => {
  const [hendelser, setHendelser] = useState([]);
  useEffect(() => {
    getInformasjonHendelser(setHendelser);
  }, []);

  return (
    <>
      {hendelser.map(h => (
        <LenkepanelMedIkon
          className="infoMelding"
          data-ga="Dittnav/Varsel"
          alt="fliser.ditt.sykevravaer"
          overskrift={h.tekst}
          href={h.link}
        >
          <IkonInformasjon />
        </LenkepanelMedIkon>
      ))}
    </>
  );
};

export default Hendelser;
