import React, { useContext } from 'react';
import Api from '../../Api';
import Hendelse from './Hendelse';
import HendelseContext from '../../context/HendelseContext';
import HendelserType from '../../types/HendelserType';

const Hendelser = ({ hendelser }) => {
  const updateHendelser = useContext(HendelseContext);

  const removeHendelse = (eventId, uid) => {
    updateHendelser(hendelser
      .filter(h => eventId !== h.eventId));

    Api.postDone({
      eventId,
      uid,
    });
  };

  return (
    <>
      {hendelser.map(h => (
        <Hendelse
          key={h.eventId}
          eventId={h.eventId}
          uid={h.uid}
          type={h.type}
          tekst={h.tekst}
          link={h.link}
          removeHendelse={removeHendelse}
        />
      ))}
    </>
  );
};

Hendelser.propTypes = {
  hendelser: HendelserType,
};

Hendelser.defaultProps = {
  hendelser: null,
};

export default Hendelser;
