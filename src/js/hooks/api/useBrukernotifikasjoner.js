import { useQuery } from 'react-query';
import Api from '../../Api';
import useStore from '../useStore';

const useBeskjeder = () => {
  const { state, addBeskjeder, setError } = useStore();

  useQuery('beskjeder', Api.fetchBeskjeder, {
    onSuccess: addBeskjeder,
    onError: setError,
  });

  return state.beskjeder;
};

const useOppgaver = () => (
  useQuery('oppgaver', Api.fetchOppgaver, { onError: useStore().setError })
);

const useInnbokser = () => (
  useQuery('innbokser', Api.fetchInnbokser, { onError: useStore().setError })
);

const useBrukernotifikasjoner = () => (
  [useBeskjeder(), useOppgaver(), useInnbokser()]
);

export default useBrukernotifikasjoner;
