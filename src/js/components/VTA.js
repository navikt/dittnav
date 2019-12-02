import React from 'react';
import NAVSPA from '../../NAVSPA';
import Config from '../Config';

const VTA = NAVSPA.importer('vta');

class Vta extends React.Component {
  constructor(props) {
    super(props);
    this.state = { render: false };
    const script = document.createElement('script');
    script.src = Config.IS_LOCAL ? `${Config.VTA_PATH}/static/js/main.js` : `${Config.VTA_PATH}/micro/static/js/main.js`;
    script.type = 'text/javascript';
    script.addEventListener('load', () => {
      this.setState({ render: true });
    });
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  render() {
    return (
      <>
        <link type="text/css" rel="stylesheet" href={`${Config.VTA_PATH}/micro/static/css/main.css`} />
        { this.state.render ? <VTA /> : null }
      </>
    );
  }
}

export default Vta;
