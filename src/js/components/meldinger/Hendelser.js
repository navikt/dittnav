import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import Config from '../../globalConfig';
import Hendelse from './Hendelse';
import HendelseContext from '../../context/HendelseContext';

const Hendelser = ({ hendelser }) => {
  const updateHendelser = useContext(HendelseContext);

  const removeHendelse = (eventId) => {
    updateHendelser(hendelser
      .filter(h => eventId !== h.eventId));

    Api.postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done`,
      {
        eventId,
      },
    );
  };

  return (
    <>
      {hendelser.map(h => (
        <Hendelse
          key={h.eventId}
          eventId={h.eventId}
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
  hendelser: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])),
};

Hendelser.defaultProps = {
  hendelser: null,
};


export default Hendelser;
