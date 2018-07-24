import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const i18n = {
  'melding.se': 'Se melding',
  'melding.se.oversikt': 'Oversikt over meldinger',
  'nav.melding.flere': 'Du har fått {0} nye meldinger fra NAV',
  'nav.melding.en': 'Du har fått en ny melding fra NAV',
};

const numberToWord = (tall) => {
  const ord = ['to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
  return tall > 12 ? tall : ord[tall - 2];
}; // TODO will be fixed in IN-365

class NavMeldinger extends Component {
  render() {
    const { navMessagesCount } = this.props;
    if (navMessagesCount === 0) return null;
    return (
      <a className="message clickable" data-ga="Dittnav/Varsel/Nav-melding" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.MELDINGER_NAV_PATH}`}>
        <span className="icon default-icon" aria-label="default-ikon" />
        <div className="texts">
          <p>{navMessagesCount !== 1 ? i18n['nav.melding.flere'].format(numberToWord(navMessagesCount)) : i18n['nav.melding.en']}</p>
          <p>{i18n[navMessagesCount !== 1 ? 'melding.se.oversikt' : 'melding.se']}</p>
        </div>
      </a>
    );
  }
}

NavMeldinger.propTypes = {
  navMessagesCount: PropTypes.number.isRequired,
};

export default NavMeldinger;
