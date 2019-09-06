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

function makeFooterTekst(numRemainingSaker) {
  if (numRemainingSaker <= 0) {
    return 'Du har ingen flere aktive saker';
  }
  return <a href={`${saksoversiktUrl}#saksoversikt`}>{`Du har ${numRemainingSaker} flere aktive saker`}</a>;
}

class DittnavLenkePanel extends React.Component {
  render() {
    const { antallSakstema, sakstemaList } = this.props.sakstema;

    const sakerValid = sakstemaList || [];
    const visStorSaksoversikt = sakerValid && antallSakstema > 0;
    const numRemainingSaker = antallSakstema - sakerValid.length;
    const footer = (
      <div key="footer">
        <hr />
        <Undertekst>
          {makeFooterTekst(numRemainingSaker)}
        </Undertekst>
      </div>
    );

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
                headerLenkeTekst={`Se alle dine saker (${antallSakstema})`}
                headerLenkeHref={saksoversiktUrl}
                liste={
                  sakerValid.map((tema) => (
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
