import React from 'react';
import PropTypes from 'prop-types';
import Hendelser from '../../components/meldinger/Hendelser';
import AdvarselBox from './Alerts/AdvarselBox';

const Varslinger = ({ hendelser }) => (
  <div className="row">
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <section className="infomeldinger-list">
          <AdvarselBox />
          <Hendelser hendelser={hendelser} />
        </section>
      </div>
    </div>
  </div>
);

Varslinger.propTypes = {
  hendelser: PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Varslinger.defaultProps = {
  hendelser: null,
};

export default Varslinger;
