import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PageFrame from '../PageFrame';
import Varslinger from './Varslinger';
import useBeskjedStore from '../../hooks/useBeskjedStore';
import scroll from '../../utils/scroll';
import { ADD_BESKJEDER, ADD_INAKTIVE_BESKJEDER } from '../../types/Actions';
import ApiType from '../../types/ApiType';
import DelayedSpinner from '../../components/DelayedSpinner';

const VarslingerRender = ({ api }) => {
  const [beskjeder, setBeskjeder] = useState({ loading: true });
  const [oppgaver, setOppgaver] = useState({ data: null, loading: true });
  const [innbokser, setInnbokser] = useState({ data: null, loading: true });
  const [inaktiveBeskjeder, setInaktiveBeskjeder] = useState({ loading: true });
  const [inaktiveOppgaver, setInaktiveOppgaver] = useState({ data: null, loading: true });
  const [inaktiveInnbokser, setInnaktiveInnbokser] = useState({ data: null, loading: true });
  const [innlogging, setInnlogging] = useState({ data: null, loading: true });
  const [error, setError] = useState([]);
  const { dispatch } = useBeskjedStore();
  const location = useLocation();

  useEffect(
    () => {
      api.fetchBeskjeder()
        .then((r) => {
          dispatch({ type: ADD_BESKJEDER, payload: r });
          setBeskjeder({ loading: false });
        }).catch(() => {
          setBeskjeder({ loading: false });
          setError(['error.baksystemer']);
        });

      api.fetchOppgaver()
        .then((r) => {
          setOppgaver({ data: r, loading: false });
        }).catch(() => {
          setOppgaver(d => ({ ...d, loading: false }));
          setError(['error.baksystemer']);
        });

      api.fetchInnbokser()
        .then((r) => {
          setInnbokser({ data: r, loading: false });
        }).catch(() => {
          setInnbokser(d => ({ ...d, loading: false }));
          setError(['error.baksystemer']);
        });

      api.fetchInaktiveBeskjeder()
        .then((r) => {
          dispatch({ type: ADD_INAKTIVE_BESKJEDER, payload: r });
          setInaktiveBeskjeder({ loading: false });
        }).catch(() => {
          setInaktiveBeskjeder({ loading: false });
          setError(['error.baksystemer']);
        });

      api.fetchInaktiveOppgaver()
        .then((r) => {
          setInaktiveOppgaver({ data: r, loading: false });
        }).catch(() => {
          setInaktiveOppgaver(d => ({ ...d, loading: false }));
          setError(['error.baksystemer']);
        });

      api.fetchInaktiveInnbokser()
        .then((r) => {
          setInnaktiveInnbokser({ data: r, loading: false });
        }).catch(() => {
          setInnaktiveInnbokser(d => ({ ...d, loading: false }));
          setError(['error.baksystemer']);
        });

      api.fetchInnlogging()
        .then((r) => {
          setInnlogging({ data: r, loading: false });
        }).catch(() => {
          setInnlogging(d => ({ ...d, loading: false }));
          setError(['error.baksystemer']);
        });
    }, [],
  );

  const areLoading = (result) => result.loading;
  const isLoading = [beskjeder, oppgaver, innbokser, inaktiveBeskjeder, inaktiveOppgaver, inaktiveInnbokser, innlogging].some(areLoading);

  if (!isLoading && location.hash) {
    scroll(location.hash);
  }

  return (
    <>
      {isLoading
        ? <DelayedSpinner delay={500} spinnerClass="header-spinner spinner-container" />
        : (
          <PageFrame uniqueErrors={error}>
            <Varslinger
              oppgaver={oppgaver.data}
              innbokser={innbokser.data}
              inaktiveOppgaver={inaktiveOppgaver.data}
              inaktiveInnbokser={inaktiveInnbokser.data}
              innlogging={innlogging.data}
            />
          </PageFrame>
        )}
    </>
  );
};

VarslingerRender.propTypes = {
  api: ApiType.isRequired,
};

export default VarslingerRender;
