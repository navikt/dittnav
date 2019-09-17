import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Config from '../Config';
import { LenkepanelMedIkon } from './LenkepanelMedIkon';
import OversiktspanelMedListe from './OversiktspanelMedListe';
import DinesakerSakstema from './DinesakerSakstema';

import i18n from '../../translations/i18n';

const MAX_SAKER_SOM_VISES = 2;

class DittnavLenkePanel extends React.Component {
  //  makeFooter(numRemainingSaker) {
  //   const { numberToWord } = i18n.nb;
  //
  //   return (
  //     <div className="saksoversikt-footer typo-undertekst" key="footer">
  //       { numRemainingSaker > 0
  //         ? (
  //           <a href={Config.LENKER.saksoversikt.url} className="footer-lenke" id="dekorator-bottomborder-overstyring">
  //             {
  //               numRemainingSaker === 1
  //                 ? <FormattedMessage id="saksoversikt.har.entil.sak" />
  //                 : <FormattedMessage id="saksoversikt.har.flere.saker" values={{ count: numberToWord(numRemainingSaker) }} />
  //             }
  //           </a>
  //         )
  //         : (
  //           <>
  //             <FormattedMessage id="saksoversikt.ingen.flere.saker" />
  //             <a href={Config.LENKER.saksoversiktHjelp.url} className="saksoversikt-footer__lenke" id="dekorator-bottomborder-overstyring">
  //               <FormattedMessage id="saksoversikt.hjelp" />
  //             </a>
  //           </>
  //         )}
  //     </div>
  //   );
  // }

  makeSaksoversiktPanel(sakstemaList) {
    if (!sakstemaList || sakstemaList.length === 0) {
      return (
        <OversiktspanelMedListe
          className="dittnav-lenkepanel-stor"
          overskrift={<FormattedMessage id="saksoversikt.overskrift" />}
          headerLenkeTekst="Din saksoversikt"
          headerLenkeHref={Config.LENKER.saksoversikt.url}
          border
          liste={[
            <div className="saksoversikt-footer typo-undertekst" key="footer">
              <span className="typo-undertekst">
                {'Du har ingen saker. '}
                <a href={Config.LENKER.saksoversiktHjelp.url} className="saksoversikt-footer__lenke" id="dekorator-bottomborder-overstyring">
                  <FormattedMessage id="saksoversikt.hjelp" />
                </a>
              </span>
            </div>,
          ]}
        />
      );
    }

    const { antallSakstema } = this.props.sakstema;
    const { numberToWord } = i18n.nb;
    const sakstemaListPruned = sakstemaList.slice(0, MAX_SAKER_SOM_VISES);
    const numRemainingSaker = antallSakstema - sakstemaListPruned.length;

    const footer = (
      <div className="saksoversikt-footer" key="footer">
        <span className="typo-undertekst">
          { numRemainingSaker > 0
            ? (
              <a href={Config.LENKER.saksoversikt.url} className="saksoversikt-footer__lenke" id="dekorator-bottomborder-overstyring">
                {
                  numRemainingSaker === 1
                    ? <FormattedMessage id="saksoversikt.har.entil.sak" />
                    : <FormattedMessage id="saksoversikt.har.flere.saker" values={{ count: numberToWord(numRemainingSaker) }} />
                }
              </a>
            )
            : (
              <>
                <FormattedMessage id="saksoversikt.ingen.flere.saker" />
                <a href={Config.LENKER.saksoversiktHjelp.url} className="saksoversikt-footer__lenke" id="dekorator-bottomborder-overstyring">
                  <FormattedMessage id="saksoversikt.hjelp" />
                </a>
              </>
            )}
       </span>
      </div>
    );

    const liste = sakstemaListPruned.map((tema) => (
      <DinesakerSakstema
        key={tema.temakode}
        tema={tema}
      />
    )).concat(footer);

    return (
      <OversiktspanelMedListe
        className="dittnav-lenkepanel-stor"
        overskrift={<FormattedMessage id="saksoversikt.overskrift" />}
        headerLenkeTekst={<FormattedMessage id="saksoversikt.alle.saker" values={{ count: antallSakstema }} />}
        headerLenkeHref={Config.LENKER.saksoversikt.url}
        liste={liste}
        border
      />
    );
  }

  render() {
    const { sakstemaList } = this.props.sakstema;
    const harSaker = sakstemaList && sakstemaList.length > 0;
    const dinesakerPanel = this.makeSaksoversiktPanel(sakstemaList);

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
