import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const translations = {
  'saksoversikt.soknad.en': 'Du har en søknad som du ikke har sendt',
  'saksoversikt.soknad.flere': 'Du har {0} søknader som du ikke har sendt',
  'saksoversikt.lenke': 'Fortsett innsending',
  'feilmelding.saksoversikt': 'Det skjedde en feil under henting av saker',
}; // TODO will be fixed in IN-365

const numberToWord = (tall) => {
  const ord = ['to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
  return tall > 12 ? tall : ord[tall - 2];
}; // TODO will be fixed in IN-365

class PaabegynteSoknader extends Component {
  render() {
    const saker = this.props.paabegynteSaker;

    if (!saker || saker.length === 0) return null;

    const text = saker.length === 1 ? translations['saksoversikt.soknad.en'] :
      translations['saksoversikt.soknad.flere'].format(numberToWord(saker.length));

    const url = saker.length === 1 ? saker[0].uri : conf.dittNav.SAKSOVERSIKT_URL;
    return (
      <a data-ga="Dittnav/Varsel/Paabegynt soknad" className="message clickable" href={url}>
        <span className="icon document-icon" aria-label="dokument-ikon" />
        <div className="texts">
          <p>{text}</p>
          <p id="paabegynte-tekst">{translations['saksoversikt.lenke']}</p>
        </div>
      </a>
    );
  }
}

export const PaabegynteSakType = PropTypes.shape({
  uri: PropTypes.string.isRequired,
});

PaabegynteSoknader.propTypes = {
  paabegynteSaker: PropTypes.arrayOf(PaabegynteSakType),
};

PaabegynteSoknader.defaultProps = {
  paabegynteSaker: null,
};

export default PaabegynteSoknader;
