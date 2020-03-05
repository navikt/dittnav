import React from 'react';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import HendelserType from '../types/HendelserType';
import InnloggingType from '../types/InnloggingType';

const Brukernotifikasjoner = ({ hendelser, innlogging }) => {
  const getBrukernotifikasjon = (bn) => {
    const BRUKERNOTIFIKASJON = {
      BESKJED: <Beskjed beskjed={bn} hendelser={hendelser} innlogging={innlogging} />,
      OPPGAVE: <Oppgave oppgave={bn} innlogging={innlogging} />,
      INNBOKS: <Innboks innboks={bn} innlogging={innlogging} />,
    };

    return BRUKERNOTIFIKASJON[bn.type];
  };

  return (
    <>
      {hendelser.map(bn => (
        <div key={bn.eventId}>
          {getBrukernotifikasjon(bn)}
        </div>
      ))}
    </>
  );
};

Brukernotifikasjoner.propTypes = {
  hendelser: HendelserType,
  innlogging: InnloggingType,
};

Brukernotifikasjoner.defaultProps = {
  hendelser: null,
  innlogging: null,
};

export default Brukernotifikasjoner;
