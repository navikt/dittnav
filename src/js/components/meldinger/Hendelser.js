import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import Config from '../../globalConfig';
import Hendelse from './Hendelse';

const Hendelser = (featureToggle) => {
  const [hendelser, setHendelser] = useState([]);

  const removeHendelse = (eventId) => {
    setHendelser(hendelser
      .filter(h => eventId !== h.eventId));

    Api.postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done`,
      {
        eventId,
      },
    );
    console.log(`Marked event as done for (id): ${eventId} to url: ${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done}`);
  };

  useEffect(() => {
    if (featureToggle.isFeatureEnabled) {
      Api
        .fetchHendelser()
        .then((r) => {
          setHendelser(r);
        });
    }
  }, [featureToggle]);

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


export default Hendelser;
