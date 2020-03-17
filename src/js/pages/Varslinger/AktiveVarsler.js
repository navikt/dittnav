import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../components/Brukernotifikasjoner';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';
import OppgaverType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';

const AktiveVarsler = ({ beskjeder, oppgaver, innbokser, innlogging }) => {
  if (!beskjeder || !oppgaver || !innbokser || !innlogging) {
    return null;
  }
  const antallAktiveVarsler = beskjeder.length + oppgaver.length + innbokser.length;

  return (
    <div className="aktive-varsler">
      <div className="aktive-varsler__tittel">
        <Systemtittel>
          <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: antallAktiveVarsler }} />
        </Systemtittel>
      </div>
      <Brukernotifikasjoner beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
    </div>
  );
};

AktiveVarsler.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
};

AktiveVarsler.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innlogging: null,
};

export default AktiveVarsler;
