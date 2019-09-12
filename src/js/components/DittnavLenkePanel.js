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

class DittnavLenkePanel extends React.Component {
  makeSaksoversiktPanel(sakstemaList) {
    const { antallSakstema } = this.props.sakstema;
    const sakstemaListPruned = sakstemaList.slice(0, MAX_SAKER_SOM_VISES);
    const numRemainingSaker = antallSakstema - sakstemaListPruned.length;
    const visFooter = numRemainingSaker <= 0 && sakstemaListPruned.length < MAX_SAKER_SOM_VISES;

    const footer = visFooter
      ? (
        <div key="footer">
          <hr />
          <Undertekst>
            <FormattedMessage id="saksoversikt.ingen.flere.saker" />
          </Undertekst>
        </div>
      )
      : null;

    const liste = sakstemaListPruned.map((tema) => (
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
        headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />}
        headerLenkeHref={Config.LENKER.saksoversikt.url}
        border
        liste={liste}
      />
    );
  }

  render() {
    const { sakstemaList } = this.props.sakstema;
    const harSaker = sakstemaList && sakstemaList.length > 0;

    const dinesakerPanel = harSaker
      ? this.makeSaksoversiktPanel(sakstemaList)
      : (
        <LenkepanelMedIkon
          className="dittnav-lenkepanel-smaa-item"
          alt="Dine saker"
          overskrift="fliser.dine.saker"
          ingress=""
          href={Config.LENKER.saksoversikt.url}
        />
      );

    return (
      <div className="dittnav-lenkepanel-top-container">
        { harSaker ? dinesakerPanel : null }
        <div className="dittnav-lenkepanel-smaa" id={harSaker ? 'cols-layout' : null}>
          { !harSaker ? dinesakerPanel : null }
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className="dittnav-lenkepanel-smaa-item"
            href={Config.LENKER.utbetalingsoversikt.url}
          />
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-smaa-item last"
            href={Config.LENKER.innboks.url}
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
