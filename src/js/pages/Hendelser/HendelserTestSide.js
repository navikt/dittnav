import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import Api from '../../Api';
import TittelHendelser from './TittelHendelser';
import FormHendelser from './FormHendelser';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import SelectHendelser from './SelectHendelser';
import log from '../../utils/Logger';
import useBeskjedStore from '../../hooks/useBeskjedStore';

const HendelserTestSide = () => {
  const [oppgaver, setOppgaver] = useState(null);
  const [innbokser, setInnbokser] = useState(null);
  const [innlogging, setInnlogging] = useState(null);
  const [tekst, setTekst] = useState('');
  const [lenke, setLenke] = useState('');
  const [valg, setValg] = useState('beskjed');
  const { state } = useBeskjedStore();

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
          setOppgaver={setOppgaver}
          setInnbokser={setInnbokser}
        />
        <Fareknapp onClick={() => removeHendelser()}>
          <F id="hendelser.fjern" />
        </Fareknapp>
      </Panel>

      <div className="infomeldinger-list">
        <div className="infomeldinger-list__container">
          <Brukernotifikasjoner
            beskjeder={state.beskjeder}
            oppgaver={oppgaver}
            innbokser={innbokser}
            innlogging={innlogging}
          />
        </div>
      </div>
    </div>
  );
};

export default HendelserTestSide;
