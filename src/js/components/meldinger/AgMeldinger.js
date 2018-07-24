import React, { Component } from 'react';
import conf from 'js/Config';

const i18n = {
  'ag.lenkeTekst': '<b>[ag.lenkeTekst locale:lb, variant:null]</b>',
  'ag.melding.flere': 'Du har fått {0} nye meldinger fra arbeidsgiver',
  'ag.melding.en': 'Du har fått en ny melding fra arbeidsgiver',
};

class AgMeldinger extends Component {
  render() {
    const text = i18n['ag.melding.en'];
    return (
      <a data-ga="Dittnav/Varsel/Arbeidsgiver" className="message clickable" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDINGER_NAV_PATH}`}>
        <span className="icon ag-icon" aria-label="snakkeboble-ikon" />
        <div className="texts">
          <p>{text}</p>
          <p>{i18n['ag.lenkeTekst']}</p>
        </div>
      </a>
    );
  }
}

export default AgMeldinger;
