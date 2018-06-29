import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Artikkel extends Component {
  render() {
    if (!this.props.article) return null;

    const {
      url, preface, lead, heading, className,
    } = this.props.article;

    return (
      <div className="row artikkel">
        <div className="container">
          <div className="col-md-8 col-standalone">
            <article>
              <p className={`preface underline ${className.replace(/_/g, '-')}`}>
                {preface}
              </p>
              <h1 className="typo-innholdstittel">
                {heading}
              </h1>
              <p>
                {lead}
              </p>
              <a data-ga="Dittnav/Artikkel" href={url} className="lenke">
                Les mer om dette
              </a>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

Artikkel.propTypes = {
  article: PropTypes.shape({
    url: PropTypes.string,
    preface: PropTypes.string,
    lead: PropTypes.string,
    heading: PropTypes.string,
    className: PropTypes.string,
  }),
};

Artikkel.defaultProps = {
  article: null,
};

export default Artikkel;
