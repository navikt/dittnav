import React, { useState } from 'react';
import { func, string } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useStore from '../../hooks/useStore';
import Api from '../../Api';

const FormHendelser = ({ tekst, lenke, valg, setTekst, setLenke, setOppgaver, setInnbokser }) => {
  const { addBeskjeder } = useStore();
  const [tekstError, setTekstError] = useState({ tekst: '', value: false });
  const [lenkeError, setLenkeError] = useState({ tekst: '', value: false });
  const disabled = tekstError.value || lenkeError.value;

  const getBrukernotifikasjoner = () => {
    Api.fetchBeskjeder()
      .then(([r]) => {
        addBeskjeder(r);
      });

    Api.fetchOppgaver()
      .then(([r]) => {
        setOppgaver(r);
      });

    Api.fetchInnbokser()
      .then(([r]) => {
        setInnbokser(r);
      });
  };

  const clearInput = () => {
    setTekst('');
    setLenke('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.postHendelse(
      `produce/${valg}`,
      {
        tekst,
        link: lenke,
      },
    );
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

  const handleTekstValidation = (event) => {
    setTekst(event.target.value);
    checkInputLength(tekst, setTekstError, 500, 'Maks lengde på teksten er 500 tegn');
  };

  const handleLenkeValidation = (event) => {
    setLenke(event.target.value);
    checkInputLength(lenke, setLenkeError, 200, 'Maks lengde på lenken er 200 tegn');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skriv inn ny tekst:"
        value={tekst}
        onChange={e => handleTekstValidation(e)}
        feil={tekstError.tekst}
      />
      <Input
        label="Skriv inn ny lenke:"
        value={lenke}
        onChange={e => handleLenkeValidation(e)}
        feil={lenkeError.tekst}
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
  setTekst: func.isRequired,
  setLenke: func.isRequired,
  setOppgaver: func.isRequired,
  setInnbokser: func.isRequired,
};

export default FormHendelser;
