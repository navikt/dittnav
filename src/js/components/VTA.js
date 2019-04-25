import React from 'react';
import Config from 'js/Config';
import NAVSPA from '../../NAVSPA';

const VTA = NAVSPA.importer('vta');

class Vta extends React.Component {
  constructor() {
    super();
    this.state = { render: false };
    const script = document.createElement('script');
    script.src = `/veientilarbeid/static/js/main.js`;
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      this.setState({ render: true });
    });
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  render() {
    return (
      <React.Fragment>
        <link type="text/css" rel="stylesheet" href={`/veientilarbeid/static/css/main.css`} />
        { this.state.render ? <VTA /> : null }
      </React.Fragment>
    );
  }
}

export default Vta;
