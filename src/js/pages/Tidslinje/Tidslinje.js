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

const fetchTidslinje = async () => {
  const path = '/tidslinje';
  const query = `?grupperingsid=${TidslinjeApi.GRUPPERINGS_ID}&produsent=${TidslinjeApi.PRODUSENT}`;

  const response = await fetch(buildTidslinjeUrl(path, query));
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
            <Tidslinjepanel data={data} />
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Tidslinje;
