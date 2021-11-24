import React from 'react';
import { func } from 'prop-types';
import '../../less/components/ArkiverKnapp.less';

const ArkiverKnapp = ({ onClick, onMouseEnter, onMouseLeave }) => (
  <button 
    type="button"
    className="arkiverknapp" 
    onClick={onClick}
    onKeyPress={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    Arkivér
  </button>
);

export default ArkiverKnapp;

ArkiverKnapp.propTypes = {
  onClick: func.isRequired,
  onMouseEnter: func.isRequired,
  onMouseLeave: func.isRequired,
};
