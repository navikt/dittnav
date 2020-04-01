import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import useBeskjedStore from '../../../hooks/useBeskjedStore';
import InnloggingType from '../../../types/InnloggingType';
import OppgaverType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const antallVarsler = (varsler) => (varsler ? varsler.length : 0);

const AktiveVarsler = ({ oppgaver, innbokser, innlogging }) => {
  const { state } = useBeskjedStore();
  const antallAktiveVarsler = antallVarsler(state.beskjeder) + antallVarsler(oppgaver) + antallVarsler(innbokser);

  return (
    <div className="aktive-varsler">
      {state.beskjeder && oppgaver && innbokser && (
        <div className="aktive-varsler__tittel">
          <Systemtittel>
            <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: antallAktiveVarsler }} />
          </Systemtittel>
        </div>
      )}
      <Brukernotifikasjoner
        beskjeder={state.beskjeder}
        oppgaver={oppgaver}
        innbokser={innbokser}
        innlogging={innlogging}
        erAktiv
      />
    </div>
  );
};

AktiveVarsler.propTypes = {
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
};

AktiveVarsler.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innlogging: null,
};

export default AktiveVarsler;
