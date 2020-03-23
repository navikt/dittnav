import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import Api from '../../Api';
import TittelHendelser from './TittelHendelser';
import FormHendelser from './FormHendelser';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import SelectHendelser from './SelectHendelser';
import BeskjedContext from '../../context/BeskjedContext';
import log from '../../utils/Logger';

const HendelserTestSide = () => {
  const [beskjeder, setBeskjeder] = useState(null);
  const [oppgaver, setOppgaver] = useState(null);
  const [innbokser, setInnbokser] = useState(null);
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
          setBeskjeder={setBeskjeder}
          setOppgaver={setOppgaver}
          setInnbokser={setInnbokser}
        />
        <Fareknapp onClick={() => removeHendelser()}>
          <F id="hendelser.fjern" />
        </Fareknapp>
      </Panel>

      <BeskjedContext.Provider value={setBeskjeder}>
        <div className="infomeldinger-list">
          <div className="infomeldinger-list__container">
            <Brukernotifikasjoner
              beskjeder={beskjeder}
              oppgaver={oppgaver}
              innbokser={innbokser}
              innlogging={innlogging}
            />
          </div>
        </div>
      </BeskjedContext.Provider>
    </div>
  );
};

export default HendelserTestSide;
