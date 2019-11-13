import React, { useState } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import Api from '../../Api';
import Config from '../../Config';
import TittelTestGui from './TittelTestGui';
import FormTestGui from './FormTestGui';
import Hendelse from '../meldinger/Hendelse';
import SelectTestGui from './SelectTestGui';

const HendelserTestGui = () => {
  const [hendelser, setHendelser] = useState([]);
  const [tekst, setTekst] = useState('');
  const [lenke, setLenke] = useState('');
  const [valg, setValg] = useState('informasjon');

  const removeHendelser = () => Api
    .postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done/all`,
      null,
    );

  const removeHendelse = (id) => {
    setHendelser(hendelser
      .filter(h => id !== h.id));

    Api.postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done`,
      {
        eventId: id,
      },
    );
    console.log(`Marked event as done for (id): ${id} to url: ${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done}`);
  };

  return (
    <div>
      <Panel className="hendelser" border>
        <TittelTestGui />
        <SelectTestGui setValg={setValg} />
        <FormTestGui
          tekst={tekst}
          lenke={lenke}
          valg={valg}
          setTekst={setTekst}
          setLenke={setLenke}
          setHendelser={setHendelser}
        />
        <Fareknapp onClick={() => removeHendelser()}>
          <F id="hendelser.fjern" />
        </Fareknapp>
      </Panel>

      <div className="infomeldinger-list">
        <div className="infomeldinger-list__container">
          {hendelser.map(h => (
            <Hendelse
              id={h.id}
              type={h.type}
              tekst={h.tekst}
              link={h.link}
              removeHendelse={removeHendelse}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HendelserTestGui;
