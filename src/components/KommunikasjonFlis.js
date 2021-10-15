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

const KommunikasjonFlis = ({ oppfolging }) => (
  <PanelBase className="kommunikasjon-flis">
  
    <Systemtittel className="kommunikasjon-flis-overskrift">
      <F id="kommunikasjon.med.nav.overskrift" />
    </Systemtittel>

    <KommunikasjonFlisElement
      className="kommunikasjon-flis-innboks" 
      tittel={<F id="kommunikasjon.med.nav.innboks" />} 
      undertekst={<F id="kommunikasjon.med.nav.innboks.undertekst" />}
      Ikon={IkonEmail}
      linkUrl={lenker.nyInnboks.url}
      onClick={() => trackEvent(
        GoogleAnalyticsCategory.Forside,
        GoogleAnalyticsAction.DineSaker,
        lenker.nyInnboks.url,
      )}
    />
    {oppfolging 
      ? (
        <KommunikasjonFlisElement
          className="kommunikasjon-flis-dialog" 
          tittel={<F id="kommunikasjon.med.nav.dialog.veileder" />} 
          undertekst={<F id="kommunikasjon.med.nav.dialog.veileder.undertekst" />}
          Ikon={IkonDialogMedVeileder}
          linkUrl={lenker.dialogMedVeileder.url}
          onClick={() => trackEvent(
            GoogleAnalyticsCategory.Forside,
            GoogleAnalyticsAction.DineSaker,
            lenker.dialogMedVeileder.url,
          )}         
        />
      )
      : ''}
    <KommunikasjonFlisElement 
      className="kommunikasjon-flis-brev-vedtak" 
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

KommunikasjonFlis.propTypes = {
  oppfolging: PropTypes.bool,
};

KommunikasjonFlis.defaultProps = {
  oppfolging: false,
};
export default KommunikasjonFlis;
