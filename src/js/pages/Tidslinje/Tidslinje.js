import React from 'react';
import { useQuery } from 'react-query';
import { Sidetittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import PageBase from '../PageBase';
import Statuspanel from './panel/Statuspanel';
import Dokumentpanel from './panel/Dokumentpanel';
import Tidslinjepanel from './panel/Tidslinjepanel';
import Brodsmuler from '../../utils/brodsmuler';
import { forventninger } from '../../utils/tidslinje';
import { TidslinjeApi } from '../../constants';
import { buildTidslinjeUrl } from '../../utils/api';

export const fetchTidslinje = async () => {
  const queryString = `?grupperingsid=${TidslinjeApi.GRUPPERINGS_ID}&produsent=${TidslinjeApi.PRODUSENT}`;
  const response = await fetch(buildTidslinjeUrl('/tidslinje', queryString));

  return response.json();
};

const Tidslinje = () => {
  const { status, data } = useQuery('tidslinje', fetchTidslinje, { retry: 0 });

  if (status === 'loading') {
    return null;
  }

  return (
    <PageBase uniqueErrors={[]} breadcrumbs={Brodsmuler.dittnav}>
      <div className="row">
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <Sidetittel className="sakstittel">
              <FormattedMessage id="tidslinje.sakstittel" />
            </Sidetittel>
            <Statuspanel />
            <Dokumentpanel />
            <Tidslinjepanel notifikasjoner={data} forventninger={forventninger} />
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Tidslinje;
