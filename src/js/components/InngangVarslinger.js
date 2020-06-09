import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron';
import Config from '../globalConfig';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/GoogleAnalytics';

const InngangVarslinger = () => (
  <div className="varslinger-inngang-wrapper">
    <Undertittel className="varslinger-inngang">
      <Link
        id="varslinger-inngang__lenke-id"
        to="/dittnav/varslinger#inaktive-varsler"
        onClick={() => trackEvent(
          GoogleAnalyticsCategory.Forside,
          GoogleAnalyticsAction.Varslinger,
          `${Config.dittNav.DITTNAV_VARSLINGER}`,
        )}
      >
        <FormattedMessage id="dittnav.infomeldinger.inngang.varslinger" />
      </Link>
      <HoyreChevron className="varslinger-inngang__chevron" />
    </Undertittel>
  </div>
);

export default InngangVarslinger;
