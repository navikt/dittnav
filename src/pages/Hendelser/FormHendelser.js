import React, {useEffect, useState} from 'react';
import {func, string} from 'prop-types';
import {FormattedMessage as F} from 'react-intl';
import {Input} from 'nav-frontend-skjema';
import {Knapp} from 'nav-frontend-knapper';
import useStore from '../../hooks/useStore';
import {fetchBeskjeder, fetchInnbokser, fetchOppgaver, postHendelse} from '../../Api';

const FormHendelser = ({ tekst, lenke, valg, eksternVarsling, synligFremTil, epostVarslingstekst, epostVarslingstittel, smsVarslingstekst, setTekst, setLenke, setSynligFremTil, setEpostVarslingstekst, setEpostVarslingstittel, setSmsVarslingstekst, setOppgaver, setInnbokser }) => {
  const { addBeskjeder } = useStore();
  const [tekstError, setTekstError] = useState({ tekst: '', value: false });
  const [lenkeError, setLenkeError] = useState({ tekst: '', value: false });
  const [synligFremTilError, setSynligFremTilError] = useState({ tekst: '', value: false });
  const [epostVarslingstekstError, setEpostVarslingstekstError] = useState({ tekst: '', value: false });
  const [epostVarslingstittelError, setEpostVarslingstittelError] = useState({ tekst: '', value: false });
  const [smsVarslingstekstError, setSmsVarslingstekstError] = useState({ tekst: '', value: false });
  const [grupperingsid, setGrupperingsid] = useState('');
  const disabled = tekstError.value || lenkeError.value;
  const isInnboks = valg === 'innboks';

  const getBrukernotifikasjoner = () => {
    fetchBeskjeder()
      .then(([r]) => {
        addBeskjeder(r);
      });

    fetchOppgaver()
      .then(([r]) => {
        setOppgaver(r);
      });

    fetchInnbokser()
      .then(([r]) => {
        setInnbokser(r);
      });
  };

  const clearInput = () => {
    setTekst('');
    setLenke('');
    setGrupperingsid('');
  };

  const convertStringToBoolean = (value) => (
    value === 'true'
  );

  const postContent = () => {
    const content = {
      tekst,
      grupperingsid: grupperingsid || 'default-grupperingsid',
      link: lenke,
      eksternVarsling: convertStringToBoolean(eksternVarsling),
      synligFremTil: synligFremTil ? new Date(synligFremTil).toISOString() : null,
      epostVarslingstekst: epostVarslingstekst ? epostVarslingstekst : null,
      epostVarslingstittel: convertStringToBoolean(eksternVarsling) && epostVarslingstittel ? epostVarslingstittel : null,
      smsVarslingstekst: convertStringToBoolean(eksternVarsling) && smsVarslingstekst ? smsVarslingstekst : null,
      prefererteKanaler: convertStringToBoolean(eksternVarsling) ? ["SMS", "EPOST"] : [],
    };

    if (valg === 'innboks') {
      delete content.synligFremTil;
    }

    return content;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    postHendelse(`produce/${valg}`, postContent());
    clearInput();
  };

  const checkInputLength = (input, setInputError, limit, message) => {
    if (input.length >= limit) {
      setInputError({ tekst: message, value: true });
    }

    if (input.length < limit && disabled) {
      setInputError({ tekst: '', value: false });
    }
  };

  const handleTekstValidation = () => {
    checkInputLength(tekst, setTekstError, 500, 'Maks lengde på teksten er 500 tegn');
  };
  useEffect(handleTekstValidation, [tekst])

  const handleLenkeValidation = () => {
    checkInputLength(lenke, setLenkeError, 200, 'Maks lengde på lenken er 200 tegn');
  };
  useEffect(handleLenkeValidation, [lenke])

  const handleSynligFremTilValidation = () => {
    if (synligFremTil && new Date(synligFremTil).getTime() < new Date().getTime()) {
      setSynligFremTilError({tekst: "Synlig frem til må være i fremtid", value: true})
    } else {
      setSynligFremTilError({tekst: "", value: false})
    }
  }
  useEffect(handleSynligFremTilValidation, [synligFremTil])

  const handleEpostVarslingstekstValidation = () => {
    checkInputLength(epostVarslingstekst, setEpostVarslingstekstError, 10000, 'Maks lengde på epost er 10000 tegn');
  }
  useEffect(handleEpostVarslingstekstValidation, [epostVarslingstekst])

  const handleEpostVarslingstittelValidation = () => {
    checkInputLength(epostVarslingstekst, setEpostVarslingstittelError, 200, 'Maks lengde på epost tittel er 200 tegn');
  }
  useEffect(handleEpostVarslingstittelValidation, [epostVarslingstittel])

  const handleSmsVarslingstekstValidation = () => {
    checkInputLength(smsVarslingstekst, setSmsVarslingstekstError, 160, 'Maks lengde på sms er 160 tegn');
  }
  useEffect(handleSmsVarslingstekstValidation, [smsVarslingstekst])

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skriv inn ny tekst:"
        value={tekst}
        onChange={e => setTekst(e.target.value)}
        feil={tekstError.tekst}
      />
      <Input
        label="Skriv inn ny lenke:"
        value={lenke}
        onChange={e => setLenke(e.target.value)}
        feil={lenkeError.tekst}
      />
      { !isInnboks ? (
        <>
          <Input
            label="Velg synlig frem til dato:"
            value={synligFremTil}
            type="date"
            onChange={e => setSynligFremTil(e.target.value)}
            feil={synligFremTilError.tekst}
          />
        </>
      )
        : null}
      { convertStringToBoolean(eksternVarsling)
        && (
        <>
          <Input
            label="Skriv inn ny epost varslingstekst:"
            value={epostVarslingstekst}
            onChange={e => setEpostVarslingstekst(e.target.value)}
            feil={epostVarslingstekstError.tekst}
          />
          <Input
            label="Skriv inn ny epost varslingstittel:"
            value={epostVarslingstittel}
            onChange={e => setEpostVarslingstittel(e.target.value)}
            feil={epostVarslingstittelError.tekst}
          />
          <Input
            label="Skriv inn ny sms varslingstekst:"
            value={smsVarslingstekst}
            onChange={e => setSmsVarslingstekst(e.target.value)}
            feil={smsVarslingstekstError.tekst}
          />
        </>
        )}
      <Input
        label="Skriv inn ny grupperingsid:"
        value={grupperingsid}
        onChange={e => setGrupperingsid(e.target.value)}
      />
      <div className="knapper">
        <Knapp className="knapper__send" htmlType="submit" disabled={disabled}>
          <F id="hendelser.send" />
        </Knapp>
        <Knapp className="knapper__hent" htmlType="button" onClick={() => getBrukernotifikasjoner()}>
          <F id="hendelser.hent" />
        </Knapp>
      </div>
    </form>
  );
};

FormHendelser.propTypes = {
  tekst: string.isRequired,
  lenke: string.isRequired,
  valg: string.isRequired,
  eksternVarsling: string.isRequired,
  synligFremTil: string.isRequired,
  epostVarslingstekst: string.isRequired,
  epostVarslingstittel: string.isRequired,
  smsVarslingstekst: string.isRequired,
  setTekst: func.isRequired,
  setLenke: func.isRequired,
  setSynligFremTil: func.isRequired,
  setEpostVarslingstekst: func.isRequired,
  setEpostVarslingstittel: func.isRequired,
  setSmsVarslingstekst: func.isRequired,
  setOppgaver: func.isRequired,
  setInnbokser: func.isRequired,
};

export default FormHendelser;
