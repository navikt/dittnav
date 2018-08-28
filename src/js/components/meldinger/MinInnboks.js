import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

import conf from 'js/Config';

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

const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

class MinInnboks extends Component {
  render() {
    const baseUrl = conf.dittNav.MIN_INNBOKS_URL.replace(/mininnboks/, 'innloggingsinfo/');
    const mininnboks = splitMessages(this.props.mininnboks);
    const { numberToWord } = i18n[this.props.intl.locale];
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
            <p><F id={formatFlereEn(mininnboks.unanswered.length, 'mininnboks.ubesvarte.meldinger.')} values={{ count: numberToWord(mininnboks.unanswered.length) }} /></p>
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
            <p><F id={formatFlereEn(mininnboks.unread.length, 'mininnboks.uleste.meldinger.')} values={{ count: numberToWord(mininnboks.unread.length) }} /></p>
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
            <p><F id={`${formatFlereEn(mininnboks.documents.length, 'mininnboks.dokument.meldinger.')}`} values={{ count: numberToWord(mininnboks.documents.length) }} /></p>
          </div>
        </a>}

        {mininnboks.tasks.length > 0 &&
        <a
          href={`${baseUrl}${buildUrl(mininnboks.tasks)}`}
          className="message clickable"
        >
          <span className="icon registration-icon" aria-label="sjekkliste-ikon" />
          <div className="texts">
            <p><F id={formatFlereEn(mininnboks.tasks.length, 'mininnboks.oppgave.meldinger.')} values={{ count: numberToWord(mininnboks.tasks.length) }} /></p>
          </div>
        </a>}
      </React.Fragment>
    );
  }
}

export const MinInnboksType = PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired, uri: PropTypes.string }));

MinInnboks.propTypes = {
  mininnboks: MinInnboksType.isRequired, // eslint-disable-line react/no-typos
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(MinInnboks);
