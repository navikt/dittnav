import { useQuery } from 'react-query';
import { fetchBeskjeder, fetchOppgaver, fetchInnbokser } from '../Api';
import useStore from './useStore';

const useBeskjeder = () => {
  const { state, addBeskjeder, setError } = useStore();

  useQuery('beskjeder', fetchBeskjeder, {
    onSuccess: addBeskjeder,
    onError: setError,
  });

  return state.beskjeder;
};

const useOppgaver = () => (
  useQuery('oppgaver', fetchOppgaver, { onError: useStore().setError })
);

const useInnbokser = () => (
  useQuery('innbokser', fetchInnbokser, { onError: useStore().setError })
);

const useBrukernotifikasjoner = () => (
  [useBeskjeder(), useOppgaver(), useInnbokser()]
);

export default useBrukernotifikasjoner;
