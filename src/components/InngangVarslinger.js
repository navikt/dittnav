import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Undertittel } from 'nav-frontend-typografi';
import HoyreChevron from 'nav-frontend-chevron';
import { Dittnav } from '../constants';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/googleAnalytics';

const InngangVarslinger = () => (
  <div className="varslinger-inngang-wrapper">
    <Undertittel className="varslinger-inngang">
      <Link
        id="varslinger-inngang__lenke-id"
        to="/dittnav/varslinger"
        onClick={() => trackEvent(
          GoogleAnalyticsCategory.Forside,
          GoogleAnalyticsAction.Varslinger,
          `${Dittnav.VARSLINGER_URL}`,
        )}
      >
        <FormattedMessage id="dittnav.infomeldinger.inngang.varslinger" />
      </Link>
      <HoyreChevron className="varslinger-inngang__chevron" />
    </Undertittel>
  </div>
);

export default InngangVarslinger;
