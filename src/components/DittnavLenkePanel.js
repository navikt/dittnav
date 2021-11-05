import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import OversiktspanelMedListe from './common/OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import { lenker } from '../utils/lenker';
import { useSakstema } from '../hooks/useSaker';
import { useOppfolging } from '../hooks/usePerson';
import KommunikasjonFlis from './KommunikasjonFlis';

const Utbetalingerpanel = (additionalClassName) => (
  <Lenkepanel
    alt="Utbetalinger"
    className={`${additionalClassName}dittnav-lenkepanel-liten-item`}
    href={lenker.utbetalingsoversikt.url}
    border
  >
    <F id="fliser.dine.utbetalinger" />
  </Lenkepanel>
);

const antallSakstemaVist = 2;

const DittnavLenkePanel = () => {
  const [{ data: saker }] = useSakstema();
  const [{ data: oppfolging }] = useOppfolging();
  const [utbetalingOverst, setUtbetalingOverst] = useState(false);

  const brukerUnderOppfolging = oppfolging && oppfolging.content.erBrukerUnderOppfolging;
  const visStortSakspanel = saker && saker.content.sakstemaer?.length > 0;
  const sakerURL = saker?.content?.sakerURL;

  useEffect(() => {
    setUtbetalingOverst(!brukerUnderOppfolging && visStortSakspanel);
  }, [visStortSakspanel, brukerUnderOppfolging]);

  return (
    <div className="dittnav-lenkepanel-container">
      {utbetalingOverst ? Utbetalingerpanel('utbetalingerpanel ') : ''}

      <div className="dittnav-lenkepanel-tokol">
        <div className="dittnav-lenkepanel-venstre">
          {!utbetalingOverst ? Utbetalingerpanel('') : ''}

          {visStortSakspanel ? (
            <OversiktspanelMedListe
              className="dittnav-lenkepanel-stor"
              overskrift={<F id="saksoversikt.overskrift" />}
              headerLenkeTekst={(
                <F
                  id="saksoversikt.alle.saker"
                  values={{ count: saker.content.antallSakstema }}
                />
              )}
              headerLenkeHref={sakerURL}
              border={false}
              liste={saker.content.sakstemaer
                .slice(0, antallSakstemaVist)
                .map((sak) => (
                  <DinesakerSakstema
                    key={sak.kode}
                    tema={sak}
                    url={sakerURL}
                  />
                ))}
            />
          ) : (
            <Lenkepanel
              alt="Dine saker"
              className="dittnav-lenkepanel-liten-item"
              href={saker?.content.sakerURL}
              border
            >
              <F id="fliser.dine.saker" />
            </Lenkepanel>
          )}
        </div>
        <KommunikasjonFlis oppfolging={brukerUnderOppfolging} />
      </div>
    </div>
  );
};

export default DittnavLenkePanel;
