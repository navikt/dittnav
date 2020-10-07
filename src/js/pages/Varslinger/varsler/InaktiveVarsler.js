import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import InnloggingsstatusType from '../../../types/InnloggingsstatusType';
import BeskjedType from '../../../types/BeskjedType';
import OppgaveType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const InaktiveVarsler = ({ beskjeder, oppgaver, innbokser, innloggingsstatus }) => (
  <div className="inaktive-varsler" id="inaktive-varsler">
    {(beskjeder || oppgaver || innbokser) && (
      <div className="inaktive-varsler__tittel">
        <Systemtittel>
          <FormattedMessage id="varslinger.inaktive.tittel" />
        </Systemtittel>
      </div>
    )}
    <Brukernotifikasjoner
      beskjeder={beskjeder}
      oppgaver={oppgaver}
      innbokser={innbokser}
      innloggingsstatus={innloggingsstatus}
      erInaktiv
    />
  </div>
);

InaktiveVarsler.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

InaktiveVarsler.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
};

export default InaktiveVarsler;
