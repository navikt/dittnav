import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import { Fareknapp } from 'nav-frontend-knapper';
import Panel from 'nav-frontend-paneler';
import { postDoneAll, fetchInnloggingsstatus } from '../../Api';
import TittelHendelser from './TittelHendelser';
import FormHendelser from './FormHendelser';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import SelectHendelser from './SelectHendelser';
import log from '../../utils/logger';
import useStore from '../../hooks/useStore';
import SelectEksternVarsling from './SelectEksetrnVarsling';

const HendelserTestSide = () => {
  const [oppgaver, setOppgaver] = useState(null);
  const [innbokser, setInnbokser] = useState(null);
  const [innlogging, setInnlogging] = useState(null);
  const [tekst, setTekst] = useState('');
  const [lenke, setLenke] = useState('');
  const [epostVarslingstekst, setEpostVarslingstekst] = useState('');
  const [smsVarslingstekst, setSmsVarslingstekst] = useState('');
  const sevenDaysFromNow = new Date()
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)
  const [synligFremTil, setSynligFremTil] = useState(sevenDaysFromNow.toISOString().split("T")[0]);
  const [valg, setValg] = useState('beskjed');
  const [eksternVarsling, setEksternVarsling] = useState(false);

  const { state } = useStore();

  const removeHendelser = () => (
    postDoneAll()
  );

  useEffect(() => {
    fetchInnloggingsstatus()
      .then((r) => {
        setInnlogging(r);
      })
      .catch((e) => log(`Error: ${e}`));
  }, []);

  return (
    <div className="testpage-content">
      <Panel className="testpage-panel" border>
        <TittelHendelser />
        <SelectHendelser setValg={setValg} />
        <SelectEksternVarsling setEksternVarsling={setEksternVarsling} />
        <FormHendelser
          tekst={tekst}
          lenke={lenke}
          valg={valg}
          eksternVarsling={eksternVarsling}
          synligFremTil={synligFremTil}
          epostVarslingstekst={epostVarslingstekst}
          smsVarslingstekst={smsVarslingstekst}
          setTekst={setTekst}
          setLenke={setLenke}
          setSynligFremTil={setSynligFremTil}
          setEpostVarslingstekst={setEpostVarslingstekst}
          setSmsVarslingstekst={setSmsVarslingstekst}
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
