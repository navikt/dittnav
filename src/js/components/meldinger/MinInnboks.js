import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const i18n = {
  'mininnboks.dokument.meldinger.en': 'Du har ett ulest dokument i din innboks',
  'mininnboks.dokument.meldinger.flere': 'Du har {0} uleste dokumenter i din innboks',
  'mininnboks.oppgave.meldinger.en': 'Du har én ulest oppgave',
  'mininnboks.oppgave.meldinger.flere': 'Du har {0} uleste oppgaver',
  'mininnboks.uleste.meldinger.en': 'Du har én ulest melding i din innboks',
  'mininnboks.uleste.meldinger.flere': 'Du har {0} uleste meldinger i din innboks',
  'mininnboks.ubesvarte.meldinger.en': 'Du har ett ubesvart spørsmål i din innboks',
  'mininnboks.ubesvarte.meldinger.flere': 'Du har {0} ubesvarte spørsmål i din innboks',
}; // TODO will be fixed in IN-365

const numberToWord = (tall) => {
  const ord = ['to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
  return tall > 12 ? tall : ord[tall - 2];
}; // TODO will be fixed in IN-365

const fetchUndertype = messages => (messages.every(e => e.undertype === messages[0].undertype) ? messages[0].undertype : null);
const buildUrlOne = message => `type/${message.type.toLowerCase().split('_')[0]}/undertype/${message.undertype.toLowerCase()}/varselid/${message.varselid}`;
const buildUrlSeveral = (type, undertype) => `type/${type.toLowerCase().split('_')[0]}${undertype ? `/undertype/${undertype.toLowerCase()}` : ''}`;
const buildUrl = messages => (messages.length === 1 ? buildUrlOne(messages[0]) : buildUrlSeveral(messages[0].type, fetchUndertype(messages)));

const splitMessages = (messages) => {
  const r = {
    unread: [],
    unanswered: [],
    documents: [],
    tasks: [],
  };

  messages.forEach((m) => {
    if (m.type === 'DOKUMENT_VARSEL') {
      r.documents.push(m);
    } else if (m.type === 'OPPGAVE_VARSEL') {
      r.tasks.push(m);
    } else if (m.statuser.indexOf('UBESVART') !== -1) {
      r.unanswered.push(m);
    } else if (m.statuser.indexOf('ULEST') !== -1) {
      r.unread.push(m);
    }
  });

  return r;
};

const formatFlereEn = (length, i18String, locales) => locales[`${i18String}${length === 1 ? 'en' : 'flere'}`].format(numberToWord(length));

class MinInnboks extends Component {
  render() {
    const baseUrl = conf.dittNav.MIN_INNBOKS_URL.replace(/mininnboks/, 'innloggingsinfo/');
    const mininnboks = splitMessages(this.props.mininnboks);

    return (
      <React.Fragment>
        {mininnboks.unanswered.length > 0 &&
        <a
          data-ga="Dittnav/Varsel/ubesvart melding"
          className="message clickable"
          href={mininnboks.unanswered.length === 1 ? mininnboks.unanswered[0].uri : conf.dittNav.MIN_INNBOKS_URL}
        >
          <span className="icon mininnboks-default-icon" aria-label="snakkeboble-ikon" />
          <div className="texts">
            <p>{formatFlereEn(mininnboks.unanswered.length, 'mininnboks.ubesvarte.meldinger.', i18n)}</p>
          </div>
        </a>}

        {mininnboks.unread.length > 0 &&
        <a
          data-ga="Dittnav/Varsel/ulest melding"
          href={mininnboks.unread.length === 1 ? mininnboks.unread[0].uri : conf.dittNav.MIN_INNBOKS_URL}
          className="message clickable"
        >
          <span className="icon mininnboks-default-icon" aria-label="snakkeboble-ikon" />
          <div className="texts">
            <p>{formatFlereEn(mininnboks.unread.length, 'mininnboks.uleste.meldinger.', i18n)}</p>
          </div>
        </a>}

        {mininnboks.documents.length > 0 &&
        <a
          href={`${baseUrl}${buildUrl(mininnboks.documents)}`}
          data-ga="Dittnav/Varsel/Dokument-melding"
          className="message clickable"
        >
          <span className="icon document-icon" aria-label="dokument-ikon" />
          <div className="texts">
            <p>{formatFlereEn(mininnboks.documents.length, 'mininnboks.dokument.meldinger.', i18n)}</p>
          </div>
        </a>}

        {mininnboks.tasks.length > 0 &&
        <a
          href={`${baseUrl}${buildUrl(mininnboks.tasks)}`}
          className="message clickable"
        >
          <span className="icon registration-icon" aria-label="sjekkliste-ikon" />
          <div className="texts">
            <p>{formatFlereEn(mininnboks.tasks.length, 'mininnboks.oppgave.meldinger.', i18n)}</p>
          </div>
        </a>}
      </React.Fragment>
    );
  }
}

export const MinInnboksType = PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired, uri: PropTypes.string }));

MinInnboks.propTypes = {
  mininnboks: MinInnboksType.isRequired, // eslint-disable-line
};

export default MinInnboks;
