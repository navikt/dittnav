import React from 'react';
import { useQuery } from 'react-query';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../../utils/brodsmuler';
import PageBase from '../PageBase';
import { buildTidslinjeUrl } from '../../utils/api';
import { TidslinjeApi } from '../../constants';
import Dokumentpanel from './panel/Dokumentpanel';
import StatusPanel from './panel/Statupanel';
import Tidslinjepanel from './panel/Tidslinjepanel';

const forventninger = [
  'Dersom søknaden din blir godkjent vil du bli bedt om å sende meldekort, og du vil få første utbetaling 2-3 virkedager etter fristen for innsending av meldekort',
  'Vi vil gi deg svar på søknaden din innen 6 uker etter at du har lastet opp all nødvendig dokumentasjon',
];

const fetchTidslinje = async () => {
  const query = `?grupperingsid=${TidslinjeApi.GRUPPERINGS_ID}&produsent=${TidslinjeApi.PRODUSENT}`;
  const response = await fetch(buildTidslinjeUrl('/tidslinje', query));

  return response.json();
};

const Tidslinje = () => {
  const { status, data } = useQuery('tidslinje', fetchTidslinje);

  if (status === 'loading') {
    return null;
  }

  return (
    <PageBase uniqueErrors={[]} breadcrumbs={Brodsmuler.dittnav}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <Sidetittel className="sakstittel">
              Dine arbeidsavklaringspenger
            </Sidetittel>
            <Dokumentpanel />
            <StatusPanel />
            <Tidslinjepanel notifikasjoner={data} forventninger={forventninger} />
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Tidslinje;
