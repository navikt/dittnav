import React from 'react';
import PropTypes from 'prop-types';
import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import PanelBase from 'nav-frontend-paneler';

import IkonEmail from '../assets/IkonEmail';
import IkonDialogMedVeileder from '../assets/IkonDialogMedVeileder';
import IkonBrevVedtak from '../assets/IkonBrevVedtak';

import KommunikasjonFlisElement from './KommunikasjonFlisElement';
import { lenker } from '../utils/lenker';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/googleAnalytics';

const KommunikasjonsFlis = ({ oppfolging }) => (
  <PanelBase className="KommunikasjonsFlis">
  
    <Systemtittel className="KommunikasjonsFlis-overskrift">
      <F id="kommunikasjon.med.nav.overskrift" />
    </Systemtittel>

    <KommunikasjonFlisElement
      className="KommunikasjonsFlis-innboks" 
      tittel={<F id="kommunikasjon.med.nav.innboks" />} 
      undertekst={<F id="kommunikasjon.med.nav.innboks.undertekst" />}
      Ikon={IkonEmail}
      linkUrl={lenker.minInnboks.url}
      onClick={() => trackEvent(
        GoogleAnalyticsCategory.Forside,
        GoogleAnalyticsAction.DineSaker,
        lenker.minInnboks.url,
      )}
    />
    {oppfolging 
      ? (
        <KommunikasjonFlisElement
          className="KommunikasjonsFlis-dialog" 
          tittel={<F id="kommunikasjon.med.nav.dialog.veileder" />} 
          undertekst={<F id="kommunikasjon.med.nav.dialog.veileder.undertekst" />}
          Ikon={IkonDialogMedVeileder}
          linkUrl={lenker.veilederArbeidssoker.url}
          onClick={() => trackEvent(
            GoogleAnalyticsCategory.Forside,
            GoogleAnalyticsAction.DineSaker,
            lenker.minInnboks.url,
          )}         
        />
      )
      : ''}
    <KommunikasjonFlisElement 
      className="KommunikasjonsFlis-brev-vedtak" 
      tittel={<F id="kommunikasjon.med.nav.brev.vedtak" />}  
      undertekst={<F id="kommunikasjon.med.nav.brev.vedtak.undertekst" />}
      Ikon={IkonBrevVedtak}
      linkUrl={lenker.minInnboks.url}
      onClick={() => trackEvent(
        GoogleAnalyticsCategory.Forside,
        GoogleAnalyticsAction.DineSaker,
        lenker.minInnboks.url,
      )}      
    />
  </PanelBase>
);

KommunikasjonsFlis.propTypes = {
  oppfolging: PropTypes.bool,
};

KommunikasjonsFlis.defaultProps = {
  oppfolging: false,
};
export default KommunikasjonsFlis;
