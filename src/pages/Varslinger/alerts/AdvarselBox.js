import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../../../utils/lenker';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../../../utils/googleAnalytics';

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
                href={lenker.innboks.url}
                onClick={() => trackEvent(
                  GoogleAnalyticsCategory.Varslinger,
                  GoogleAnalyticsAction.Innboks,
                  lenker.innboks.url,
                )}
              >
                innboksen
              </Lenke>
            ),
            saksoversikt: (
              <Lenke
                href={lenker.saksoversikt.url}
                onClick={() => trackEvent(
                  GoogleAnalyticsCategory.Varslinger,
                  GoogleAnalyticsAction.DineSaker,
                  lenker.saksoversikt.url,
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
