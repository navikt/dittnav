import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import Config from '../Config';

import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';

class DittnavLenkePanel extends React.Component {
  render() {
    const { isFeatureEnabled, sakstema } = this.props;
    const visStortSakspanel = isFeatureEnabled && sakstema && sakstema.sakstemaList && sakstema.sakstemaList.length > 0;

    return (
      <div className="dittnav-lenkepanel-top-container">
        { visStortSakspanel
          ? (
            <OversiktspanelMedListe
              className="dittnav-lenkepanel-stor"
              overskrift={<FormattedMessage id="saksoversikt.overskrift" />}
              headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: sakstema.antallSakstema }} />}
              headerLenkeHref={Config.LENKER.saksoversikt.url}
              border
              liste={
                sakstema.sakstemaList
                  .map((tema) => (
                    <DinesakerSakstema
                      key={tema.temakode}
                      tema={tema}
                    />
                  ))
              }
            />
          ) : null }
        <div className="dittnav-lenkepanel-liten" id={visStortSakspanel ? 'cols-layout' : null}>
          { !visStortSakspanel
            ? (
              <Lenkepanel
                alt="Dine saker"
                className="dittnav-lenkepanel-liten-item"
                href={Config.LENKER.saksoversikt.url}
                border
              >
                {<FormattedMessage id="fliser.dine.saker" />}
              </Lenkepanel>
            ) : null}
          <Lenkepanel
            alt="Utbetalinger"
            className="dittnav-lenkepanel-liten-item"
            href={Config.LENKER.utbetalingsoversikt.url}
            border
          >
            {<FormattedMessage id="fliser.dine.utbetalinger" />}
          </Lenkepanel>
          <Lenkepanel
            alt="Innboks"
            className="dittnav-lenkepanel-liten-item last"
            href={Config.LENKER.innboks.url}
            border
          >
            {<FormattedMessage id="fliser.innboks" />}
          </Lenkepanel>
        </div>
      </div>
    );
  }
}

DittnavLenkePanel.propTypes = {
  isFeatureEnabled: PropTypes.bool,
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

DittnavLenkePanel.defaultProps = {
  isFeatureEnabled: true,
};

export default DittnavLenkePanel;
