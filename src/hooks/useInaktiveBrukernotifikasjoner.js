import { useQuery } from 'react-query';
import { fetchInaktiveBeskjeder, fetchInaktiveOppgaver, fetchInaktiveInnbokser } from '../Api';
import useStore from './useStore';

const useInaktiveBeskjeder = () => {
  const { state, addInaktiveBeskjeder, setError } = useStore();

  useQuery('inaktiveBeskjeder', fetchInaktiveBeskjeder, {
    onSuccess: addInaktiveBeskjeder,
    onError: setError,
  });

  return state.inaktiveBeskjeder;
};

const useInaktiveOppgaver = () => (
  useQuery('inaktiveOppgaver', fetchInaktiveOppgaver, { onError: useStore().setError })
);

const useInaktiveInnbokser = () => (
  useQuery('inaktiveInnbokser', fetchInaktiveInnbokser, { onError: useStore().setError })
);

const useInaktiveBrukernotifikasjoner = () => (
  [useInaktiveBeskjeder(), useInaktiveOppgaver(), useInaktiveInnbokser()]
);

export default useInaktiveBrukernotifikasjoner;
