import React, { useState, useEffect } from 'react';
import { FormattedMessage as F } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import OversiktspanelMedListe from './common/OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';
import { useSakstema } from '../hooks/useSaker';
import { useOppfolging } from '../hooks/usePerson';
import KommunikasjonFlis from './KommunikasjonFlis';

const Utbetalingerpanel = (additionalClassName) => (
  <Lenkepanel
    alt="Utbetalinger"
    className={`${additionalClassName}dittnav-lenkepanel-liten-item`}
    href={lenker.utbetalingsoversikt.url}
    onClick={() => trackEvent(
      GoogleAnalyticsCategory.Forside,
      GoogleAnalyticsAction.Utbetalinger,
      lenker.utbetalingsoversikt.url,
    )}
    border
  >
    <F id="fliser.dine.utbetalinger" />
  </Lenkepanel>
);

const antallSakstemaVist = 2;

const DittnavLenkePanel = () => {
  const [{ data: sakstema }] = useSakstema();
  const [{ data: oppfolging }] = useOppfolging();
  const [utbetalingOverst, setUtbetalingOverst] = useState(false);

  const brukerUnderOppfolging = oppfolging && oppfolging.content.erBrukerUnderOppfolging;
  const visStortSakspanel = sakstema && sakstema.content.sakstemaList && sakstema.content.sakstemaList.length > 0;

  useEffect(() => {
    setUtbetalingOverst(!brukerUnderOppfolging && visStortSakspanel);
  }, [visStortSakspanel, brukerUnderOppfolging]);

  return (
    <div className="dittnav-lenkepanel-top-container">
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
                  values={{ count: sakstema.content.antallSakstema }}
                />
              )}
              headerLenkeHref={lenker.saksoversikt.url}
              border={false}
              liste={sakstema.content.sakstemaList
                .slice(0, antallSakstemaVist)
                .map((tema) => (
                  <DinesakerSakstema key={tema.temakode} tema={tema} />
                ))}
            />
          ) : (
            <Lenkepanel
              alt="Dine saker"
              className="dittnav-lenkepanel-liten-item"
              href={lenker.saksoversikt.url}
              onClick={() => trackEvent(
                GoogleAnalyticsCategory.Forside,
                GoogleAnalyticsAction.DineSaker,
                lenker.saksoversikt.url,
              )}
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
