import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import useStore from '../../../hooks/useStore';
import InnloggingsstatusType from '../../../types/InnloggingsstatusType';
import OppgaveType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const InaktiveVarsler = ({ oppgaver, innbokser, innloggingsstatus }) => {
  const { state } = useStore();

  return (
    <div className="inaktive-varsler" id="inaktive-varsler">
      {(state.inaktiveBeskjeder || oppgaver || innbokser) && (
        <div className="inaktive-varsler__tittel">
          <Systemtittel>
            <FormattedMessage id="varslinger.inaktive.tittel" />
          </Systemtittel>
        </div>
      )}
      <Brukernotifikasjoner
        beskjeder={state.inaktiveBeskjeder}
        oppgaver={oppgaver}
        innbokser={innbokser}
        innloggingsstatus={innloggingsstatus}
        erInaktiv
      />
    </div>
  );
};

InaktiveVarsler.propTypes = {
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

InaktiveVarsler.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
};

export default InaktiveVarsler;
