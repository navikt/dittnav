import React, { Component } from 'react';

class VeientilArbeid extends Component {
  render() {
    return (
      <div className="ditt-list responsive-fo-container" id="fo-container">
        <iframe id="fo" title='Veien til arbeid' scrolling="no" className="responsive-fo" src={'http://localhost:3002/'}> </iframe>
      </div>
    );
  }
}

export default VeientilArbeid;
