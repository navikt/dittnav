import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import PropTypes from 'prop-types';
import Lenkepanel from 'nav-frontend-lenkepanel/lib';
import OversiktspanelMedListe from './common/OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../utils/GoogleAnalytics';
import { lenker } from '../utils/lenker';

const antallSakstemaVist = 2;

class DittnavLenkePanel extends React.Component {
  render() {
    const { sakstema } = this.props;
    const visStortSakspanel = sakstema && sakstema.sakstemaList && sakstema.sakstemaList.length > 0;

    return (
      <div className="dittnav-lenkepanel-top-container">
        { visStortSakspanel
          ? (
            <OversiktspanelMedListe
              className="dittnav-lenkepanel-stor"
              overskrift={<F id="saksoversikt.overskrift" />}
              headerLenkeTekst={<F id="saksoversikt.alle.saker" values={{ count: sakstema.antallSakstema }} />}
              headerLenkeHref={lenker.saksoversikt.url}
              border={false}
              liste={
                sakstema.sakstemaList
                  .slice(0, antallSakstemaVist)
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
                href={lenker.saksoversikt.url}
                onClick={() => trackEvent(
                  GoogleAnalyticsCategory.Forside,
                  GoogleAnalyticsAction.DineSaker,
                  lenker.saksoversikt.url,
                )}
                border
              >
                <F id="fliser.dine.saker" />
              </Lenkepanel>
            ) : null}
          <Lenkepanel
            alt="Utbetalinger"
            className="dittnav-lenkepanel-liten-item"
            href={lenker.utbetalingsoversikt.url}
            onClick={() => trackEvent(
              GoogleAnalyticsCategory.Forside,
              GoogleAnalyticsAction.Utbetalinger,
              lenker.utbetalingsoversikt.url,
            )}
            border
          >
            <F id="fliser.dine.utbetalinger" />
          </Lenkepanel>
          <Lenkepanel
            alt="Innboks"
            className="dittnav-lenkepanel-liten-item last"
            href={lenker.innboks.url}
            onClick={() => trackEvent(
              GoogleAnalyticsCategory.Forside,
              GoogleAnalyticsAction.MinInnboks,
              lenker.innboks.url,
            )}
            border
          >
            <F id="fliser.innboks" />
          </Lenkepanel>
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
  }),
};

DittnavLenkePanel.defaultProps = {
  sakstema: null,
};

export default DittnavLenkePanel;
