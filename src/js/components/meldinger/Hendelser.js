import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import { IkonInformasjon, IkonMelding, IkonOppgave, LenkepanelMedIkon } from '../paneler/LenkepanelMedIkon';
import Config from '../../Config';
import PanelMedIkon from '../paneler/PanelMedIkon';
import PanelOverskrift from '../paneler/PanelOverskrift';

const getHendelseIkon = (type) => {
  switch (type) {
    case 'INFORMASJON':
      return <IkonInformasjon />;
    case 'OPPGAVE':
      return <IkonOppgave />;
    case 'MELDING':
      return <IkonMelding />;
    default:
      return null;
  }
};

const getHendelser = (setHendelser) => Api
  .fetchHendelser()
  .then((r) => {
    setHendelser(r);
  });

const removeHendelser = (hendelseId) => {
  console.log(`Marked all events as done for (id): ${hendelseId}`);
  Api.postHendelser(
    `${Config.dittNav.DITTNAV_EVENT_HANDLER_URL}/produce/done/all`,
    {
      id: hendelseId,
    },
  );
};

const getOverskrift = (hendelse) => (
  <PanelOverskrift overskrift={hendelse.tekst} type="Element" />
);

const Hendelser = () => {
  const [hendelser, setHendelser] = useState([]);
  const erInformasjon = (hendelse) => (hendelse.type === 'INFORMASJON');

  useEffect(() => {
    getHendelser(setHendelser);
  }, []);

  return (
    <>
      {hendelser.map(h => (
        erInformasjon(h) ? (
          <PanelMedIkon
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={getOverskrift(h)}
            ikon={<IkonInformasjon />}
            onClick={() => removeHendelser(h.id)}
            key={h.id}
          />
        ) : (
          <LenkepanelMedIkon
            className="infoMelding"
            data-ga="Dittnav/Varsel"
            alt="Hendelse"
            overskrift={getOverskrift(h)}
            href={h.link}
            key={h.id}
          >
            {getHendelseIkon(h.type)}
          </LenkepanelMedIkon>
        )
      ))}
    </>
  );
};

export default Hendelser;
