import React, { useState } from 'react';
import { func, string } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import Api from '../../Api';
import { ADD_BESKJEDER } from '../../types/Actions';

const FormHendelser = ({ tekst, lenke, valg, setTekst, setLenke, setOppgaver, setInnbokser }) => {
  const { dispatch } = useBeskjedStore();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const getBrukernotifikasjoner = () => {
    Api.fetchBeskjeder()
      .then((r) => {
        dispatch({ type: ADD_BESKJEDER, payload: r });
      });

    Api.fetchOppgaver()
      .then((r) => {
        setOppgaver(r);
      });

    Api.fetchInnbokser()
      .then((r) => {
        setInnbokser(r);
      });
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
    setTekst('');
    setLenke('');
  };

  const handleTekstValidation = (event) => {
    setTekst(event.target.value);

    if (tekst.length > 500) {
      setError('Maks lengde på teksten er 500 tegn');
      setDisabled(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skriv inn ny tekst:"
        value={tekst}
        onChange={e => handleTekstValidation(e)}
        feil={error}
        disabled={disabled}
      />
      <Input
        label="Skriv inn ny lenke:"
        value={lenke}
        onChange={e => setLenke(e.target.value)}
      />
      <div className="knapper">
        <Knapp className="knapper__send" htmlType="submit">
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
