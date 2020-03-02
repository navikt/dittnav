import React from 'react';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import HendelserType from '../types/HendelserType';

const Brukernotifikasjoner = ({ hendelser }) => {
  const getBrukernotifikasjon = (bn) => {
    const BRUKERNOTIFIKASJON = {
      BESKJED: <Beskjed beskjed={bn} hendelser={hendelser} />,
      OPPGAVE: <Oppgave oppgave={bn} />,
      INNBOKS: <Innboks innboks={bn} />,
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
};

Brukernotifikasjoner.defaultProps = {
  hendelser: null,
};

export default Brukernotifikasjoner;
