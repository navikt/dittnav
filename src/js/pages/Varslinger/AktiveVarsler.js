import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Hendelser from '../../components/meldinger/Hendelser';
import HendelserType from '../../types/HendelserType';


const AktiveVarsler = ({ hendelser }) => {
  if (!hendelser) {
    return null;
  }

  return (
    <div className="aktive-varsler">
      <div className="aktive-varsler__tittel">
        <Systemtittel>
          <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: hendelser.length }} />
        </Systemtittel>
      </div>
      <Hendelser hendelser={hendelser} />
    </div>
  );
};

AktiveVarsler.propTypes = {
  hendelser: HendelserType,
};

AktiveVarsler.defaultProps = {
  hendelser: null,
};

export default AktiveVarsler;
