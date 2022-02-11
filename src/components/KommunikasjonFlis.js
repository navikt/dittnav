import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import PanelBase from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';

import IkonEmail from '../assets/IkonEmail';
import IkonDialogMedVeileder from '../assets/IkonDialogMedVeileder';
import IkonBrevVedtak from '../assets/IkonBrevVedtak';

import KommunikasjonFlisElement from './KommunikasjonFlisElement';
import { listOfActions, listOfComponentNames, logAmplitudeEvent } from '../utils/amplitudeUtils';
import { lenker } from '../utils/lenker';

const KommunikasjonFlis = ({ oppfolging }) => (
  <PanelBase className="kommunikasjon-flis">
    <Systemtittel className="kommunikasjon-flis-overskrift">
      <F id="kommunikasjon.med.nav.overskrift" />
    </Systemtittel>

    <KommunikasjonFlisElement
      className="kommunikasjon-flis-innboks"
      onClick={() => logAmplitudeEvent(listOfComponentNames.KommunikasjonFlis.Innboks, listOfActions.TrykkPaaLenke)}
      tittel={<F id="kommunikasjon.med.nav.innboks" />}
      undertekst={<F id="kommunikasjon.med.nav.innboks.undertekst" />}
      Ikon={IkonEmail}
      linkUrl={lenker.innboks.url}
    />
    {oppfolging ? (
      <KommunikasjonFlisElement
        className="kommunikasjon-flis-dialog"
        onClick={() => logAmplitudeEvent(listOfComponentNames.KommunikasjonFlis.DialogMedLokalVeileder, listOfActions.TrykkPaaLenke)}
        tittel={<F id="kommunikasjon.med.nav.dialog.veileder" />}
        undertekst={<F id="kommunikasjon.med.nav.dialog.veileder.undertekst" />}
        Ikon={IkonDialogMedVeileder}
        linkUrl={lenker.dialogMedVeileder.url}
      />
    ) : (
      ''
    )}
    <KommunikasjonFlisElement
      className="kommunikasjon-flis-brev-vedtak"
      onClick={() => logAmplitudeEvent(listOfComponentNames.KommunikasjonFlis.BrevOgVedtak, listOfActions.TrykkPaaLenke)}
      tittel={<F id="kommunikasjon.med.nav.brev.vedtak" />}
      undertekst={<F id="kommunikasjon.med.nav.brev.vedtak.undertekst" />}
      Ikon={IkonBrevVedtak}
      linkUrl={lenker.minInnboks.url}
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
