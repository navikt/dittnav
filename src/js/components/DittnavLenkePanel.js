import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import OversiktspanelMedListe from './common/OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';
import { useSakstema } from '../hooks/useSaker';

const antallSakstemaVist = 2;

const DittnavLenkePanel = () => {
  const [{ data: sakstema }] = useSakstema();
  const visStortSakspanel = sakstema && sakstema.content.sakstemaList && sakstema.content.sakstemaList.length > 0;

  return (
    <div className="dittnav-lenkepanel-top-container">
      {visStortSakspanel
        ? (
          <OversiktspanelMedListe
            className="dittnav-lenkepanel-stor"
            overskrift={<F id="saksoversikt.overskrift" />}
            headerLenkeTekst={<F id="saksoversikt.alle.saker" values={{ count: sakstema.content.antallSakstema }} />}
            headerLenkeHref={lenker.saksoversikt.url}
            border={false}
            liste={
              sakstema.content.sakstemaList
                .slice(0, antallSakstemaVist)
                .map((tema) => (
                  <DinesakerSakstema
                    key={tema.temakode}
                    tema={tema}
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
          ) : null}
        <Lenkepanel
          alt="Utbetalinger"
          className="dittnav-lenkepanel-liten-item"
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
        <Lenkepanel
          alt="Innboks"
          className="dittnav-lenkepanel-liten-item last"
          href={lenker.innboks.url}
          onClick={() => trackEvent(
            GoogleAnalyticsCategory.Forside,
            GoogleAnalyticsAction.MinInnboks,
            lenker.innboks.url,
          )}
          border
        >
          <F id="fliser.innboks" />
        </Lenkepanel>
      </div>
    </div>
  );
};

export default DittnavLenkePanel;
