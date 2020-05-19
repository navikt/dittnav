import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import { trackPageView } from '../../utils/GoogleAnalytics';
import { ADD_BESKJEDER, ADD_INAKTIVE_BESKJEDER } from '../../types/Actions';
import ApiType from '../../types/ApiType';

const VarslingerRender = ({ api }) => {
  const location = useLocation();
  const [oppgaver, setOppgaver] = useState(null);
  const [innbokser, setInnbokser] = useState(null);
  const [inaktiveOppgaver, setInaktiveOppgaver] = useState(null);
  const [inaktiveInnbokser, setInnaktiveInnbokser] = useState(null);
  const [innlogging, setInnlogging] = useState(null);
  const [error, setError] = useState([]);

  const { dispatch } = useBeskjedStore();

  const handleError = () => {
    setError(['error.baksystemer']);
  };

  useEffect(
    () => {
      trackPageView(location);
    }, [],
  );

  useEffect(
    () => {
      api.fetchBeskjeder()
        .then((r) => {
          dispatch({ type: ADD_BESKJEDER, payload: r });
        }).catch(handleError);

      api.fetchOppgaver()
        .then((r) => {
          setOppgaver(r);
        }).catch(handleError);

      api.fetchInnbokser()
        .then((r) => {
          setInnbokser(r);
        }).catch(handleError);

      api.fetchInaktiveBeskjeder()
        .then((r) => {
          dispatch({ type: ADD_INAKTIVE_BESKJEDER, payload: r });
        }).catch(handleError);

      api.fetchInaktiveOppgaver()
        .then((r) => {
          setInaktiveOppgaver(r);
        }).catch(handleError);

      api.fetchInaktiveInnbokser()
        .then((r) => {
          setInnaktiveInnbokser(r);
        }).catch(handleError);

      api.fetchInnlogging()
        .then((r) => {
          setInnlogging(r);
        }).catch(handleError);
    }, [],
  );

  return (
    <PageFrame uniqueErrors={error}>
      <Varslinger
        oppgaver={oppgaver}
        innbokser={innbokser}
        inaktiveOppgaver={inaktiveOppgaver}
        inaktiveInnbokser={inaktiveInnbokser}
        innlogging={innlogging}
      />
    </PageFrame>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
