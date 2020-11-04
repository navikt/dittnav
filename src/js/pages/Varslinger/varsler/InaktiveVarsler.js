import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import useInaktiveBrukernotifikasjoner from '../../../hooks/useInaktiveBrukernotifikasjoner';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';

const InaktiveVarsler = () => {
  const [inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser] = useInaktiveBrukernotifikasjoner();

  if (!inaktiveBeskjeder || !inaktiveOppgaver || !inaktiveInnbokser) {
    return null;
  }

  return (
    <div className="inaktive-varsler" id="inaktive-varsler">
      {(inaktiveBeskjeder || inaktiveOppgaver || inaktiveInnbokser) && (
        <div className="inaktive-varsler__tittel">
          <Systemtittel>
            <FormattedMessage id="varslinger.inaktive.tittel" />
          </Systemtittel>
        </div>
      )}
      <Brukernotifikasjoner
        beskjeder={inaktiveBeskjeder}
        oppgaver={inaktiveOppgaver}
        innbokser={inaktiveInnbokser}
        erInaktiv
      />
    </div>
  );
};

export default InaktiveVarsler;
