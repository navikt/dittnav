import React from 'react';
import PropTypes from 'prop-types';
import FeilMeldinger from '../components/FeilMeldinger';

const PageFrame = (props) => (
  <main role="main">
    <FeilMeldinger errors={props.uniqueErrors} />
    <div className="container">
      {props.children}
    </div>
  </main>
);

PageFrame.propTypes = {
  uniqueErrors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string])).isRequired,
  children: PropTypes.node.isRequired,
};

export default PageFrame;
