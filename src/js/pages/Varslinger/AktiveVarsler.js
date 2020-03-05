import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import HendelserType from '../../types/HendelserType';
import InnloggingType from '../../types/InnloggingType';

const isLoading = (hendelser, innlogging) => !hendelser || !innlogging;

const AktiveVarsler = ({ hendelser, innlogging }) => {
  if (isLoading(hendelser, innlogging)) {
    return null;
  }

  return (
    <div className="aktive-varsler">
      <div className="aktive-varsler__tittel">
        <Systemtittel>
          <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: hendelser.length }} />
        </Systemtittel>
      </div>
      <Brukernotifikasjoner hendelser={hendelser} innlogging={innlogging} />
    </div>
  );
};

AktiveVarsler.propTypes = {
  hendelser: HendelserType,
  innlogging: InnloggingType,
};

AktiveVarsler.defaultProps = {
  hendelser: null,
  innlogging: null,
};

export default AktiveVarsler;
