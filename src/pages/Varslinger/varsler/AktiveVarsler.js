import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Systemtittel } from 'nav-frontend-typografi';
import Brukernotifikasjoner from '../../../components/Brukernotifikasjoner';
import useBrukernotifikasjoner from '../../../hooks/useBrukernotifikasjoner';

const antallVarsler = (varsler) => (varsler && varsler.content ? varsler.content.length : 0);

const AktiveVarsler = () => {
  const [beskjeder, { data: oppgaver }, { data: innbokser }] = useBrukernotifikasjoner();
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
        erAktiv
      />
    </div>
  );
};

export default AktiveVarsler;
