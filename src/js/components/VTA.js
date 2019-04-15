import React from 'react';
import NAVSPA from '../../NAVSPA';
import Config from 'js/Config';

const VTA = NAVSPA.importer('vta');

class Vta extends React.Component {
  constructor() {
    super();
    this.state = {render: false};
    const script = document.createElement("script");
    script.src = `${Config.VTA_PATH}/static/js/main.js`;
    script.type="text/javascript";
    script.addEventListener('load', () => {
      this.setState({render: true})
    });
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  render() {
    return(
      <React.Fragment>
        <link type="text/css" rel="stylesheet" href={`${Config.VTA_PATH}/static/css/main.css`} />
        { this.state.render ? <VTA/> : null }
      </React.Fragment>
    );
  }
}

export default Vta;
