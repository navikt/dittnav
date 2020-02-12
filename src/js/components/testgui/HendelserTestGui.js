import React, { useState } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import Api from '../../Api';
import Config from '../../globalConfig';
import TittelTestGui from './TittelTestGui';
import FormTestGui from './FormTestGui';
import Hendelse from '../meldinger/Hendelse';
import SelectTestGui from './SelectTestGui';

const HendelserTestGui = () => {
  const [hendelser, setHendelser] = useState([]);
  const [tekst, setTekst] = useState('');
  const [lenke, setLenke] = useState('');
  const [valg, setValg] = useState('beskjed');

  const removeHendelser = () => Api
    .postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done/all`,
      null,
    );

  const removeHendelse = (eventId) => {
    setHendelser(hendelser
      .filter(h => eventId !== h.eventId));

    Api.postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done`,
      {
        eventId,
      },
    );
  };

  return (
    <div className="hendelser-content">
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
              eventId={h.eventId}
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
