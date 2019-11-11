import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { FormattedMessage as F } from 'react-intl';
import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';
import Config from '../../Config';

const FormTestGui = ({ tekst, valg, setTekst, setHendelser }) => {
  const getInformasjonHendelser = () => Api
    .fetchHendelser()
    .then((r) => {
      setHendelser(r);
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    Api.postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/${valg}`,
      {
        tekst,
        link: 'https://localhost/100',
      },
    );
    setTekst('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skriv inn ny tekst:"
        value={tekst}
        onChange={e => setTekst(e.target.value)}
      />
      <div className="knapper">
        <Knapp className="knapper__send" htmlType="submit">
          <F id="hendelser.send" />
        </Knapp>
        <Knapp className="knapper__hent" htmlType="button" onClick={() => getInformasjonHendelser()}>
          <F id="hendelser.hent" />
        </Knapp>
      </div>
    </form>
  );
};

FormTestGui.propTypes = {
  tekst: PropTypes.string.isRequired,
  valg: PropTypes.string.isRequired,
  setTekst: PropTypes.func.isRequired,
  setHendelser: PropTypes.func.isRequired,
};

export default FormTestGui;
