import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Undertekst } from 'nav-frontend-typografi';
import Config from '../Config';
import { LenkepanelMedIkon } from './LenkepanelMedIkon';
import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';

// TODO:  - Oppdater layout jamfør siste diskusjoner (avventer hva jeg får fra backend til slutt!)

const MAX_SAKER_SOM_VISES = 2;

const saksoversiktUrl = `${Config.dittNav.SERVICES_URL}/saksoversikt/`;
const utbetalingsoversiktUrl = `${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`;
const innboksUrl = `${Config.dittNav.SERVICES_URL}/mininnboks/`;

class DittnavLenkePanel extends React.Component {
  makeSaksoversiktPanel(sakstemaList) {
    if (sakstemaList) {
      const { antallSakstema } = this.props.sakstema;
      const numRemainingSaker = antallSakstema - sakstemaList.length;
      const showFooter = numRemainingSaker <= 0 && sakstemaList.length < MAX_SAKER_SOM_VISES;

      const footer = showFooter
        ? (
          <div key="footer">
            <hr />
            <Undertekst>
              <FormattedMessage id="saksoversikt.ingen.flere.saker" />
            </Undertekst>
          </div>
        )
        : null;

      const liste = sakstemaList.map((tema) => (
        <DinesakerSakstema
          key={tema.temanavn}
          dato={tema.sisteOppdatering}
          status={tema.sisteBehandlingStatus}
          temanavn={tema.temanavn}
          href={tema.url}
        />
      )).concat(footer);

      return (
        <OversiktspanelMedListe
          className="dittnav-lenkepanel-stor"
          alt="Dine siste saker"
          overskrift={<FormattedMessage id="saksoversikt.overskrift" />}
          // ikon={<IkonSkilt />}
          headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />}
          headerLenkeHref={saksoversiktUrl}
          border
          liste={liste}
        />
      );
    }
    return (
      <LenkepanelMedIkon
        className="dittnav-lenkepanel-smaa-item"
        alt="Dine saker"
        overskrift="fliser.dine.saker"
        ingress=""
        href={saksoversiktUrl}
      />
    );
  }

  // makeFooter() {
  //
  // }

  render() {
    const { sakstemaList } = this.props.sakstema;
    const sakstemaListPruned = sakstemaList && sakstemaList.length > 0
      ? sakstemaList.slice(0, MAX_SAKER_SOM_VISES) : null;
    const saksoversiktPanel = this.makeSaksoversiktPanel(sakstemaListPruned);

    return (
      <div className="dittnav-lenkepanel-top-container">
        { sakstemaListPruned ? saksoversiktPanel : null }
        <div className="dittnav-lenkepanel-smaa" id={sakstemaListPruned ? 'cols-layout' : null}>
          { !sakstemaListPruned ? saksoversiktPanel : null }
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className="dittnav-lenkepanel-smaa-item"
            href={utbetalingsoversiktUrl}
          />
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-smaa-item last"
            href={innboksUrl}
          />
        </div>
      </div>
    );
  }
}

DittnavLenkePanel.propTypes = {
  sakstema: PropTypes.shape({
    antallSakstema: PropTypes.number.isRequired,
    sakstemaList: PropTypes.arrayOf(PropTypes.shape({
      temanavn: PropTypes.string.isRequired,
      sisteBehandlingStatus: PropTypes.string.isRequired,
      sisteOppdatering: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default DittnavLenkePanel;
