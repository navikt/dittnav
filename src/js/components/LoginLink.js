import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';

class LoginLink extends Component {
  render() {
    const { title, description, url, linkText, linkClassName } = this.props;
    return (
      <div className="element hodefot">
        <h3 className="decorated"><F id={title} /></h3>
        <p><F id={description} /></p>
        <a href={url} className={linkClassName}><F id={linkText} /></a>
      </div>
    );
  }
}

LoginLink.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkClassName: PropTypes.string.isRequired,
};

export default LoginLink;
