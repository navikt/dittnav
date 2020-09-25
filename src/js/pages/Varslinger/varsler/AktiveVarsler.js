import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import useStore from '../../../hooks/useStore';
import InnloggingsstatusType from '../../../types/InnloggingsstatusType';
import OppgaveType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const antallVarsler = (varsler) => (varsler ? varsler.length : 0);

const AktiveVarsler = ({ oppgaver, innbokser, innloggingsstatus }) => {
  const { state } = useStore();
  const antallAktiveVarsler = antallVarsler(state.beskjeder.data) + antallVarsler(oppgaver) + antallVarsler(innbokser);

  return (
    <div className="aktive-varsler">
      {state.beskjeder.data && oppgaver && innbokser && (
        <div className="aktive-varsler__tittel">
          <Systemtittel>
            <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: antallAktiveVarsler }} />
          </Systemtittel>
        </div>
      )}
      <Brukernotifikasjoner
        beskjeder={state.beskjeder.data}
        oppgaver={oppgaver}
        innbokser={innbokser}
        innloggingsstatus={innloggingsstatus}
        erAktiv
      />
    </div>
  );
};

AktiveVarsler.propTypes = {
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

AktiveVarsler.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
};

export default AktiveVarsler;
