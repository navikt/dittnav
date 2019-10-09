import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import { IkonInformasjon, IkonMelding, IkonOppgave, LenkepanelMedIkon } from '../LenkepanelMedIkon';
import { Element } from 'nav-frontend-typografi';

const getInformasjonHendelser = (setHendelser) => Api
  .fetchHendelser()
  .then((r) => {
    setHendelser(r);
  });

const getHendelseIkon = (type) => {
  switch (type) {
    case 'informasjon':
      return <IkonInformasjon />;
    case 'oppgave':
      return <IkonOppgave />;
    case 'melding':
      return <IkonMelding />;
    default:
      return <IkonInformasjon />;
  }
};

const overskrift = (hendelse) => (
  <Element className="lenkepanel__heading">
    {hendelse.tekst}
  </Element>
);

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
          alt="Hendelse"
          overskrift={overskrift(h)}
          href={h.link}
          key={h.id}
        >
          {getHendelseIkon(h.type)}
        </LenkepanelMedIkon>
      ))}
    </>
  );
};

export default Hendelser;
