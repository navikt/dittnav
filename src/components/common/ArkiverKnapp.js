import React from 'react';
import '../../less/components/ArkiverKnapp.less';

const ArkiverKnapp = (onClick) => (
  <button 
    type="button"
    className="arkiverknapp" 
    onClick={onClick}
    onKeyPress={onClick}
  >
    Arkivér
  </button>
);

export default ArkiverKnapp;
