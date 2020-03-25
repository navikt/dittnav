import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import InnloggingType from '../../../types/InnloggingType';
import BeskjedType from '../../../types/BeskjedType';
import OppgaverType from '../../../types/OppgaveType';
import InnboksType from '../../../types/InnboksType';

const InaktiveVarsler = ({ beskjeder, oppgaver, innbokser, innlogging }) => (
  <div className="inaktive-varsler">
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
      innlogging={innlogging}
      erAktiv={false}
    />
  </div>
);

InaktiveVarsler.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
};

InaktiveVarsler.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innlogging: null,
};

export default InaktiveVarsler;
