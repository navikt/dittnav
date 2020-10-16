import React from 'react';
import { useQuery } from 'react-query';
import { Panel } from 'nav-frontend-paneler';
import Brodsmuler from '../../utils/brodsmuler';
import Sekvens from './Sekvens';
import PageBase from '../PageBase';
import { buildTidslinjeUrl } from '../../utils/api';
import { TidslinjeApi } from '../../constants';

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
            <Panel border style={{ maxWidth: '800px' }}>
              {data.map((el) => (
                <Sekvens element={el} />
              ))}
            </Panel>
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Tidslinje;
