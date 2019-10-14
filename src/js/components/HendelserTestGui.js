import React, { useState } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Knapp, Fareknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';
import InformasjonTestGui from './hendelser/InformasjonTestGui';
import Api from '../Api';
import '../../less/components/Hendelser.less';
import Config from '../Config';

// Used in the GUI-test component for sending and showing events.
const HendelserTestGui = () => {
  const [hendelser, setHendelser] = useState([]);
  const [tekst, setTekst] = useState('');

  const getInformasjonHendelser = () => Api
    .fetchLegacyHendelser()
    .then((r) => {
      setHendelser(r);
    });

  const removeHendelser = () => Api
    .postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_HANDLER_URL}/produce/done/all`,
      null,
    );

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.postHendelser(
      Config.dittNav.DITTNAV_LEGACY_HENDELSER_URL,
      {
        tekst,
        link: 'https://localhost/100',
      },
    );
    setTekst('');
  };

  return (
    <div className="Hendelser">
      <Innholdstittel><F id="hendelser.tittel" /></Innholdstittel>
      <form onSubmit={handleSubmit}>
        <Input label="Skriv inn ny tekst:" value={tekst} onChange={e => setTekst(e.target.value)} />
        <div className="knapper">
          <Knapp className="knapper__send" htmlType="submit"><F id="hendelser.send" /></Knapp>
          <Knapp className="knapper__hent" htmlType="button" onClick={() => getInformasjonHendelser()}><F id="hendelser.hent" /></Knapp>
        </div>
      </form>
      <Fareknapp onClick={() => removeHendelser()}><F id="hendelser.fjern" /></Fareknapp>
      <div className="InformasjonHendelser">
        {hendelser.map(h => (
          <InformasjonTestGui key={h.id} hendelse={h} />
        ))}
      </div>
    </div>
  );
};

export default HendelserTestGui;
