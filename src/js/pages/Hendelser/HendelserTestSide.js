import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import Api from '../../Api';
import TittelHendelser from './TittelHendelser';
import FormHendelser from './FormHendelser';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import SelectHendelser from './SelectHendelser';
import HendelseContext from '../../context/HendelseContext';
import log from '../../utils/Logger';

const HendelserTestSide = () => {
  const [hendelser, setHendelser] = useState([]);
  const [innlogging, setInnlogging] = useState(null);
  const [tekst, setTekst] = useState('');
  const [lenke, setLenke] = useState('');
  const [valg, setValg] = useState('beskjed');

  const removeHendelser = () => Api
    .postDoneAll();

  useEffect(() => {
    Api.fetchInnlogging()
      .then((r) => {
        setInnlogging(r);
      })
      .catch((e) => log(`Error: ${e}`));
  }, []);

  return (
    <div className="hendelser-content">
      <Panel className="hendelser" border>
        <TittelHendelser />
        <SelectHendelser setValg={setValg} />
        <FormHendelser
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

      <HendelseContext.Provider value={setHendelser}>
        <div className="infomeldinger-list">
          <div className="infomeldinger-list__container">
            <Brukernotifikasjoner hendelser={hendelser} innlogging={innlogging} />
          </div>
        </div>
      </HendelseContext.Provider>
    </div>
  );
};

export default HendelserTestSide;
