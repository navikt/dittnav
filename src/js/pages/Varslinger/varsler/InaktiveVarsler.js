import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import useBeskjedStore from '../../../hooks/useBeskjedStore';
import InnloggingType from '../../../types/InnloggingType';
import OppgaveType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const InaktiveVarsler = ({ oppgaver, innbokser, innlogging }) => {
  const { state } = useBeskjedStore();

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
        innlogging={innlogging}
        erInaktiv
      />
    </div>
  );
};

InaktiveVarsler.propTypes = {
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
};

InaktiveVarsler.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innlogging: null,
};

export default InaktiveVarsler;
