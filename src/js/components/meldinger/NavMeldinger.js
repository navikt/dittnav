import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

class NavMeldinger extends Component {
  render() {
    const { navMessagesCount } = this.props;
    const { numberToWord } = i18n[this.props.intl.locale];

    if (navMessagesCount === 0) return null;
    return (
      <a className="message clickable" data-ga="Dittnav/Varsel/Nav-melding" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDINGER_NAV_PATH}`}>
        <span className="icon default-icon" aria-label="default-ikon" />
        <div className="texts">
          <p><F id={navMessagesCount !== 1 ? 'nav.melding.flere' : 'nav.melding.en'} values={{ count: numberToWord(navMessagesCount) }} /></p>
          <p><F id={navMessagesCount !== 1 ? 'melding.se.oversikt' : 'melding.se'} /></p>
        </div>
      </a>
    );
  }
}

NavMeldinger.propTypes = {
  navMessagesCount: PropTypes.number.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(NavMeldinger);
