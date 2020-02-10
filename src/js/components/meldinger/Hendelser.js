import React from 'react';
import PropTypes from 'prop-types';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import Config from '../../globalConfig';
import Hendelse from './Hendelse';

const Hendelser = ({ hendelser, updateHendelser }) => {
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
  updateHendelser: PropTypes.func.isRequired,
};

Hendelser.defaultProps = {
  hendelser: null,
};


export default Hendelser;
