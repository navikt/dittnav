import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import Config from '../../globalConfig';
import Hendelse from './Hendelse';

const Hendelser = () => {
  const [hendelser, setHendelser] = useState([]);

  const getHendelser = () => Api
    .fetchHendelser()
    .then((r) => {
      setHendelser(r);
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(`ERROR fetching hendelser: ${e}`);
    });

  const removeHendelse = (eventId) => {
    setHendelser(hendelser
      .filter(h => eventId !== h.eventId));

    Api.postHendelser(
      `${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done`,
      {
        eventId,
      },
    );
    console.log(`Marked event as done for (id): ${eventId} to url: ${Config.dittNav.EVENT_TEST_PRODUCER_URL}/produce/done}`);
  };

  useEffect(() => {
    getHendelser();
  }, []);

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
