import React, { useState } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';
import InformasjonTestGui from './hendelser/InformasjonTestGui';
import Api from '../Api';
import '../../less/components/Hendelser.less';

// Used in the GUI-test component for sending and showing events.
const HendelserTestGui = () => {
  const [hendelser, setHendelser] = useState([]);
  const [tekst, setTekst] = useState('');

  const getInformasjonHendelser = () => Api
    .fetchHendelser()
    .then((r) => {
      setHendelser(r);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.sendHendelser(tekst);
    setTekst('');
  };

  return (
    <div className="Hendelser">
      <Innholdstittel><F id="hendelser.tittel" /></Innholdstittel>
      <form onSubmit={handleSubmit}>
        <Input label="Skriv inn ny tekst:" value={tekst} onChange={e => setTekst(e.target.value)} />
        <div className="Knapper">
          <Knapp htmlType="submit"><F id="hendelser.send" /></Knapp>
          <Knapp htmlType="button" onClick={() => getInformasjonHendelser()}><F id="hendelser.hent" /></Knapp>
        </div>
      </form>
      <div className="InformasjonHendelser">
        {hendelser.map(h => (
          <InformasjonTestGui key={h.id} hendelse={h} />
        ))}
      </div>
    </div>
  );
};

export default HendelserTestGui;
