import React from 'react';
import NAVSPA from '../NAVSPA';
import { Path } from '../constants';

const VTA = NAVSPA.importer('vta');
const erLocalhost = /localhost/.test(window.location);

class Vta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    const script = document.createElement('script');
    script.src = `${Path.VTA}/${erLocalhost ? 'static' : 'micro/static'}/js/main.js`;
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      this.setState({ render: true });
    });
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  render() {
    return (
      <>
        <link type="text/css" rel="stylesheet" href={`${Path.VTA}/${erLocalhost ? 'static' : 'micro/static'}/css/main.css`} />
        { this.state.render ? <VTA {...this.props} /> : null }
      </>
    );
  }
}

export default Vta;
