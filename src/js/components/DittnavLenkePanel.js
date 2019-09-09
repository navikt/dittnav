import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Undertekst } from 'nav-frontend-typografi';
import Config from '../Config';
import { LenkepanelMedIkon, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';
import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';

// TODO:    - finpusse layout
//          - finn svg data for ikoner
//          - gjør layout-tilpasning litt mer elegant?
//          - lokaliser tekst

const saksoversiktUrl = `${Config.dittNav.SERVICES_URL}/saksoversikt/`;
const utbetalingsoversiktUrl = `${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`;
const innboksUrl = `${Config.dittNav.SERVICES_URL}/mininnboks/`;

const MAX_SAKER = 2;

class DittnavLenkePanel extends React.Component {
  render() {
    const { antallSakstema, sakstemaList } = this.props.sakstema;

    const sakstemaListValid = sakstemaList ? sakstemaList.slice(0, MAX_SAKER) : [];
    const visStorSaksoversikt = antallSakstema > 0;
    const numRemainingSaker = antallSakstema - sakstemaListValid.length;

    const footer = (numRemainingSaker <= 0 && sakstemaListValid.length < MAX_SAKER) ? (
      <div key="footer">
        <hr />
        <Undertekst>
          <FormattedMessage id="saksoversikt.ingen.flere.saker" />
        </Undertekst>
      </div>
    ) : null;

    return (
      <div className="dittnav-lenkepanel-top-container">
        { visStorSaksoversikt
          ? (
            <div className="dittnav-lenkepanel-top-row stor">
              <OversiktspanelMedListe
                className="dittnav-lenkepanel-top-item"
                alt="Dine saker"
                overskrift={<FormattedMessage id="fliser.dine.saker" />}
                ikon={<IkonSkilt />}
                headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />}
                headerLenkeHref={saksoversiktUrl}
                liste={
                  sakstemaListValid.map((tema) => (
                    <DinesakerSakstema
                      key={tema.temanavn}
                      dato={tema.sisteOppdatering}
                      status={tema.sisteBehandlingStatus}
                      temanavn={tema.temanavn}
                      href={tema.url}
                    />
                  )).concat([footer])
                  }
                border
              />
            </div>
          )
          : null }
        <div className={visStorSaksoversikt ? 'dittnav-lenkepanel-top-row' : 'dittnav-lenkepanel-top-col'}>
          { !visStorSaksoversikt
            ? (
              <LenkepanelMedIkon
                alt="Dine saker"
                overskrift="fliser.dine.saker"
                ingress=""
                className="dittnav-lenkepanel-top-item"
                href={saksoversiktUrl}
              >
                <IkonSkilt />
              </LenkepanelMedIkon>
            )
            : null }
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className={`dittnav-lenkepanel-top-item${visStorSaksoversikt ? ' last' : ''}`}
            href={utbetalingsoversiktUrl}
          >
            <IkonPille />
          </LenkepanelMedIkon>
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-top-item last"
            href={innboksUrl}
          >
            <IkonKane />
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
      temanavn: PropTypes.string.isRequired,
      sisteBehandlingStatus: PropTypes.string.isRequired,
      sisteOppdatering: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default DittnavLenkePanel;
