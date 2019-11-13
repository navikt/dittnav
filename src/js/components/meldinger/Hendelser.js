import React, { useState, useEffect } from 'react';
import Api from '../../Api';
import '../../../less/components/Hendelser.less';
import Config from '../../Config';
import Hendelse from './Hendelse';

const Hendelser = () => {
  const [hendelser, setHendelser] = useState([]);

  const getHendelser = () => Api
    .fetchHendelser()
    .then((r) => {
      setHendelser(r);
    });

  const removeHendelse = (id) => {
    setHendelser(hendelser
      .filter(h => id !== h.id));

    Api.postHendelser(
      `${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done`,
      {
        eventId: id,
      },
    );
    console.log(`Marked event as done for (id): ${id} to url: ${Config.dittNav.DITTNAV_EVENT_TEST}/produce/done}`);
  };

  useEffect(() => {
    getHendelser(setHendelser);
  }, []);

  return (
    <>
      {hendelser.map(h => (
        <Hendelse
          id={h.id}
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
