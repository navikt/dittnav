import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Config from '../../../globalConfig';
import {
  GoogleAnalyticsAction,
  GoogleAnalyticsCategory,
  trackEvent,
} from '../../../utils/GoogleAnalytics';

const AdvarselBox = () => (
  <div className="alertbox">
    <AlertStripe type="advarsel" className="infomelding">
      <Undertittel>
        <FormattedMessage id="varslinger.under.utvikling.tittel" />
      </Undertittel>
      <Normaltekst>
        <FormattedMessage
          id="varslinger.under.utvikling.ingress"
          values={{
            innboks: (
              <Lenke
                href={Config.LENKER.innboks.url}
                onClick={() => trackEvent(
                  GoogleAnalyticsCategory.Varslinger,
                  GoogleAnalyticsAction.Innboks,
                  Config.LENKER.innboks.url,
                )}
              >
                innboksen
              </Lenke>
            ),
            saksoversikt: (
              <Lenke
                href={Config.LENKER.saksoversikt.url}
                onClick={() => trackEvent(
                  GoogleAnalyticsCategory.Varslinger,
                  GoogleAnalyticsAction.DineSaker,
                  Config.LENKER.saksoversikt.url,
                )}
              >
                Dine saker
              </Lenke>
            ),
          }}
        />
      </Normaltekst>
    </AlertStripe>
  </div>
);

export default AdvarselBox;
