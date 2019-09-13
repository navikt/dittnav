import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

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

    const makeFooter = () => {
      const numRemainingSaker = antallSakstema - sakstemaListPruned.length;

      const melding = numRemainingSaker <= 0
        ? (
          <>
            <FormattedMessage id="saksoversikt.ingen.flere.saker" />
            <a href="#" className="footer-lenke" id="dekorator-bottomborder-overstyring">
              <FormattedMessage id="saksoversikt.ingen.flere.saker.lenke" />
            </a>
          </>
        )
        : (
          <a href={Config.LENKER.saksoversikt.url} className="footer-lenke" id="dekorator-bottomborder-overstyring">
            <FormattedMessage id="saksoversikt.har.flere.saker" values={{ count: numRemainingSaker }} />
          </a>
        );

      return (
        <div className="saksoversikt-footer typo-undertekst" key="footer">
          <i>{melding}</i>
        </div>
      );
    };

    const liste = sakstemaListPruned.map((tema) => (
      <DinesakerSakstema
        key={tema.temakode}
        temakode={tema.temakode}
        temanavn={tema.temanavn}
        dato={tema.sisteOppdatering}
        antallUnderBehandling={tema.antallStatusUnderBehandling}
      />
    )).concat(makeFooter());

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
          className="dittnav-lenkepanel-liten-item"
          alt="Dine saker"
          overskrift="fliser.dine.saker"
          ingress=""
          href={Config.LENKER.saksoversikt.url}
          children=""
        />
      );

    return (
      <div className="dittnav-lenkepanel-top-container">
        { harSaker ? dinesakerPanel : null }
        <div className="dittnav-lenkepanel-liten" id={harSaker ? 'cols-layout' : null}>
          { !harSaker ? dinesakerPanel : null }
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className="dittnav-lenkepanel-liten-item"
            href={Config.LENKER.utbetalingsoversikt.url}
            children=""
          />
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-liten-item last"
            href={Config.LENKER.innboks.url}
            children=""
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
      temakode: PropTypes.string.isRequired,
      temanavn: PropTypes.string.isRequired,
      sisteOppdatering: PropTypes.string.isRequired,
      antallStatusUnderBehandling: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
};

export default DittnavLenkePanel;
