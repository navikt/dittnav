import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Config from '../Config';
import { LenkepanelMedIkon } from './LenkepanelMedIkon';
import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import Unleash from './Unleash';
import api from '../Api';

const MAX_SAKER_SOM_VISES = 2;

class DittnavLenkePanel extends React.Component {
  makeSaksoversiktPanel() {
    const { antallSakstema, sakstemaList } = this.props.sakstema;
    const overskrift = <FormattedMessage id="saksoversikt.overskrift" />;
    const headerLenkeTekst = <FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />;

    const makeFooter = (footerTekst) => (
      <div className="saksoversikt-footer" key="footer">
        <span className="typo-undertekst">
          <FormattedMessage id={footerTekst} />
          <a href={Config.LENKER.saksoversiktHjelp.url} className="saksoversikt-footer__lenke" id="dekorator-bottomborder-overstyring">
            <FormattedMessage id="saksoversikt.hjelp.lenketekst" />
          </a>
        </span>
      </div>
    );

    if (!sakstemaList || sakstemaList.length === 0) {
      return (
        <OversiktspanelMedListe
          className="dittnav-lenkepanel-stor"
          overskrift={overskrift}
          headerLenkeTekst={headerLenkeTekst}
          headerLenkeHref={Config.LENKER.saksoversikt.url}
          liste={[makeFooter('saksoversikt.har.ingen.saker')]}
          border
        />
      );
    }

    const sakstemaListPruned = sakstemaList.slice(0, MAX_SAKER_SOM_VISES);
    const numRemainingSaker = antallSakstema - sakstemaListPruned.length;
    const footer = (
      numRemainingSaker > 0
        ? null
        : makeFooter('saksoversikt.ingen.flere.saker')
    );

    return (
      <OversiktspanelMedListe
        className="dittnav-lenkepanel-stor"
        overskrift={overskrift}
        headerLenkeTekst={headerLenkeTekst}
        headerLenkeHref={Config.LENKER.saksoversikt.url}
        liste={
          sakstemaListPruned.map((tema) => (
            <DinesakerSakstema
              key={tema.temakode}
              tema={tema}
            />
          )).concat(footer)
        }
        border
      />
    );
  }

  render() {
    return (
      <div className="dittnav-lenkepanel-top-container">
        <Unleash feature="dittnav-test" api={api}>
          {'Test feature er aktiv!'}
        </Unleash>
        { this.makeSaksoversiktPanel() }
        <div className="dittnav-lenkepanel-liten" id="cols-layout">
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className="dittnav-lenkepanel-liten-item"
            href={Config.LENKER.utbetalingsoversikt.url}
          >{''}
          </LenkepanelMedIkon>
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-liten-item last"
            href={Config.LENKER.innboks.url}
          >{''}
          </LenkepanelMedIkon>
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
