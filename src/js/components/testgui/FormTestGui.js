import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage as F } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';
import Config from '../../globalConfig';

const FormTestGui = ({ tekst, lenke, valg, setTekst, setLenke, setHendelser }) => {
  const getHendelser = () => Api
    .fetchHendelser()
    .then((r) => {
      setHendelser(r);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/${valg}`,
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
        <Knapp className="knapper__hent" htmlType="button" onClick={() => getHendelser()}>
          <F id="hendelser.hent" />
        </Knapp>
      </div>
    </form>
  );
};

FormTestGui.propTypes = {
  tekst: PropTypes.string.isRequired,
  lenke: PropTypes.string.isRequired,
  valg: PropTypes.string.isRequired,
  setTekst: PropTypes.func.isRequired,
  setLenke: PropTypes.func.isRequired,
  setHendelser: PropTypes.func.isRequired,
};

export default FormTestGui;
