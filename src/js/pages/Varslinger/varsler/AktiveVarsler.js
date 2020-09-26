import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import InnloggingsstatusType from '../../../types/InnloggingsstatusType';
import OppgaveType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';
import BeskjedType from '../../../types/BeskjedType';

const antallVarsler = (varsler) => (varsler ? varsler.length : 0);

const AktiveVarsler = ({ beskjeder, oppgaver, innbokser, innloggingsstatus }) => {
  const antallAktiveVarsler = antallVarsler(beskjeder) + antallVarsler(oppgaver) + antallVarsler(innbokser);

  return (
    <div className="aktive-varsler">
      {beskjeder && oppgaver && innbokser && (
        <div className="aktive-varsler__tittel">
          <Systemtittel>
            <FormattedMessage id="varslinger.aktive.tittel" values={{ antall: antallAktiveVarsler }} />
          </Systemtittel>
        </div>
      )}
      <Brukernotifikasjoner
        beskjeder={beskjeder}
        oppgaver={oppgaver}
        innbokser={innbokser}
        innloggingsstatus={innloggingsstatus}
        erAktiv
      />
    </div>
  );
};

AktiveVarsler.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

AktiveVarsler.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
};

export default AktiveVarsler;
