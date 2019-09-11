import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import { Undertekst } from 'nav-frontend-typografi';
import Config from '../Config';
import { LenkepanelMedIkon, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';
import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';

// TODO:    - finn svg data for ikoner

const MAX_SAKER_SOM_VISES = 2;

const saksoversiktUrl = `${Config.dittNav.SERVICES_URL}/saksoversikt/`;
const utbetalingsoversiktUrl = `${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`;
const innboksUrl = `${Config.dittNav.SERVICES_URL}/mininnboks/`;

class DittnavLenkePanel extends React.Component {

  makeSaksoversiktPanel(sakstemaList) {
    const alt = "Dine saker";
    const overskrift = "fliser.dine.saker";

    if (sakstemaList) {
      const { antallSakstema } = this.props.sakstema;
      const numRemainingSaker = antallSakstema - sakstemaList.length;
      const showFooter = numRemainingSaker <= 0 && sakstemaList.length < MAX_SAKER_SOM_VISES;

      const footer = showFooter ?
        <div key="footer">
          <hr />
          <Undertekst>
            <FormattedMessage id="saksoversikt.ingen.flere.saker" />
          </Undertekst>
        </div> : null;

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
          alt={alt}
          overskrift={<FormattedMessage id={overskrift} />}
          ikon={<IkonSkilt />}
          headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />}
          headerLenkeHref={saksoversiktUrl}
          border
          liste={liste}
        />
        );
    }
    else {
      return (
        <LenkepanelMedIkon
          className="dittnav-lenkepanel-smaa-item"
          alt={alt}
          overskrift={overskrift}
          ingress=""
          href={saksoversiktUrl}
        >
          <IkonSkilt />
        </LenkepanelMedIkon>
      );
    }
  }

  render() {
    const { sakstemaList } = this.props.sakstema;
    const sakstemaListPruned = sakstemaList && sakstemaList.length > 0
      ? sakstemaList.slice(0, MAX_SAKER_SOM_VISES) : null;
    const saksoversiktPanel = this.makeSaksoversiktPanel(sakstemaListPruned);

    return (
      <div className="dittnav-lenkepanel-top-container">
        { sakstemaListPruned ? saksoversiktPanel : null }
        <div className="dittnav-lenkepanel-smaa" id={ sakstemaListPruned ? "cols-layout" : null }>
          { !sakstemaListPruned ? saksoversiktPanel : null }
          <LenkepanelMedIkon
            alt="Utbetalinger"
            overskrift="fliser.dine.utbetalinger"
            ingress=""
            className="dittnav-lenkepanel-smaa-item"
            href={utbetalingsoversiktUrl}
          >
            <IkonPille />
          </LenkepanelMedIkon>
          <LenkepanelMedIkon
            alt="Innboks"
            overskrift="fliser.innboks"
            ingress=""
            className="dittnav-lenkepanel-smaa-item last"
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
