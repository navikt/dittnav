import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Path } from '../../constants';

class DittLink extends Component {
  render() {
    const { url, children, className } = this.props;
    const onClick = (event) => {
      event.preventDefault();
      window.history.pushState(null, null, `${Path.CONTEXT}${url}`);
      window.dispatchEvent(new window.PopStateEvent('popstate'));
    };
    return (
      <a href={Path.CONTEXT} onClick={onClick} className={className}>
        { children }
      </a>
    );
  }
}

DittLink.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DittLink.defaultProps = {
  className: '',
};

export default DittLink;
