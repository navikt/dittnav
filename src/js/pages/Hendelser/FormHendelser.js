import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage as F } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';

const FormHendelser = ({ tekst, lenke, valg, setTekst, setLenke, setBeskjeder, setOppgaver, setInnbokser }) => {
  const getBrukernotifikasjoner = () => {
    Api.fetchBeskjeder()
      .then((r) => {
        setBeskjeder(r);
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

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skriv inn ny tekst:"
        value={tekst}
        onChange={e => setTekst(e.target.value)}
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
  tekst: PropTypes.string.isRequired,
  lenke: PropTypes.string.isRequired,
  valg: PropTypes.string.isRequired,
  setTekst: PropTypes.func.isRequired,
  setLenke: PropTypes.func.isRequired,
  setBeskjeder: PropTypes.func.isRequired,
  setOppgaver: PropTypes.func.isRequired,
  setInnbokser: PropTypes.func.isRequired,
};

export default FormHendelser;
