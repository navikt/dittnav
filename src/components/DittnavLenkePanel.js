import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import OversiktspanelMedListe from './common/OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import { lenker } from '../utils/lenker';
import { useSakstema } from '../hooks/useSaker';

const antallSakstemaVist = 2;

const DittnavLenkePanel = () => {
  const [{ data: saker }] = useSakstema();
  const visStortSakspanel = saker && saker.content.sakstemaList && saker.content.sakstemaList.length > 0;
  const sakerURL = saker?.content?.sakerURL;

  /* console.log(saker?.content?.sakstemaList.map(sak => console.log(sak))); */

  return (
    <div className="dittnav-lenkepanel-top-container">
      {visStortSakspanel
        ? (
          <OversiktspanelMedListe
            className="dittnav-lenkepanel-stor"
            overskrift={<F id="saksoversikt.overskrift" />}
            headerLenkeTekst={<F id="saksoversikt.alle.saker" />}
            headerLenkeHref={sakerURL}
            border={false}
            liste={
              saker?.content?.sakstemaList
                .slice(0, antallSakstemaVist)
                .map((sak) => (
                  <DinesakerSakstema
                    key={sak.temakode}
                    tema={sak}
                    url={lenker.saksoversikt.url}
                  />
                ))
            }
          />
        ) : null}
      <div className="dittnav-lenkepanel-liten" id={visStortSakspanel ? 'cols-layout' : null}>
        {!visStortSakspanel
          ? (
            <Lenkepanel
              alt="Dine saker"
              className="dittnav-lenkepanel-liten-item"
              href={saker?.content.sakerURL}
              border
            >
              <F id="fliser.dine.saker" />
            </Lenkepanel>
          ) : null}
        <Lenkepanel
          alt="Utbetalinger"
          className="dittnav-lenkepanel-liten-item"
          href={lenker.utbetalingsoversikt.url}
          border
        >
          <F id="fliser.dine.utbetalinger" />
        </Lenkepanel>
        <Lenkepanel
          alt="Innboks"
          className="dittnav-lenkepanel-liten-item last"
          href={lenker.innboks.url}
          border
        >
          <F id="fliser.innboks" />
        </Lenkepanel>
      </div>
    </div>
  );
};

export default DittnavLenkePanel;
