import React from 'react';
import NAVSPA from '../../NAVSPA';
import { Path } from '../constants';

const VTA = NAVSPA.importer('vta');

class Vta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    const script = document.createElement('script');
    script.src = `${Path.VTA}/micro/static/js/main.js`;
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      this.setState({ render: true });
    });
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  render() {
    return (
      <>
        <link type="text/css" rel="stylesheet" href={`${Path.VTA}/micro/static/css/main.css`} />
        { this.state.render ? <VTA /> : null }
      </>
    );
  }
}

export default Vta;
