import React, { useState } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import InformasjonTestGui from './InformasjonTestGui';
import Api from '../../Api';
import Config from '../../Config';
import HendelserTittelTestGui from './HendelserTittelTestGui';
import HendelserFormTestGui from './HendelserFormTestGui';

const HendelserTestGui = () => {
  const [hendelser, setHendelser] = useState([]);
  const [tekst, setTekst] = useState('');

  const removeHendelser = () => Api
    .postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done/all`,
      null,
    );

  return (
    <div className="hendelser">
      <HendelserTittelTestGui />
      <HendelserFormTestGui tekst={tekst} setTekst={setTekst} setHendelser={setHendelser} />
      <Fareknapp onClick={() => removeHendelser()}>
        <F id="hendelser.fjern" />
      </Fareknapp>
      <div className="InformasjonHendelser">
        {hendelser.map(h => (
          h.type === 'INFORMASJON' ? <InformasjonTestGui key={h.id} hendelse={h} /> : null
        ))}
      </div>
    </div>
  );
};

export default HendelserTestGui;
