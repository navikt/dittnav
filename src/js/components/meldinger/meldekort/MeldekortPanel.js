import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import i18n from '../../../../translations/i18n';
import { IkonInformasjon } from '../../common/LenkepanelMedIkon';
import PanelOverskrift from '../../common/PanelOverskrift';
import PanelMedIkon from '../../common/PanelMedIkon';
import { fremtidig, advarsel, feriedager } from './MeldekortMeldinger';

const createOverskrift = (meldekort, risikererTrekk, formatDateMonth) => {
  const overskrift = (
    <>
      <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
      <span>{advarsel(risikererTrekk)} </span>
    </>
  );

  return <PanelOverskrift overskrift={overskrift} type="Element" />;
};

const MeldekortPanel = ({ meldekort, risikererTrekk, intl }) => {
  const { formatDateMonth } = i18n[intl.locale];

  return (
    <PanelMedIkon
      data-ga="Dittnav/Varsel"
      alt="Melding om meldekort"
      overskrift={createOverskrift(meldekort, risikererTrekk, formatDateMonth)}
      ingress={feriedager(meldekort)}
      ikon={<IkonInformasjon />}
    />
  );
};

const NesteMeldekort = PropTypes.shape({
  sisteDatoForTrekk: PropTypes.string,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.string,
  til: PropTypes.string,
  fra: PropTypes.string,
});

const NyeMeldekort = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.string,
  nesteMeldekort: NesteMeldekort,
});

export const MeldekortType = PropTypes.shape({
  nyeMeldekort: NyeMeldekort,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

MeldekortPanel.propTypes = {
  meldekort: MeldekortType.isRequired,
  risikererTrekk: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

MeldekortPanel.defaultProps = {
  risikererTrekk: null,
};

export default injectIntl(MeldekortPanel);
