import { useQuery } from 'react-query';
import Api from '../../Api';
import useStore from '../useStore';

const useInaktiveBeskjeder = () => {
  const { state, addInaktiveBeskjeder, setError } = useStore();

  useQuery('inaktiveBeskjeder', Api.fetchInaktiveBeskjeder, {
    onSuccess: addInaktiveBeskjeder,
    onError: setError,
  });

  return state.inaktiveBeskjeder;
};

const useInaktiveOppgaver = () => (
  useQuery('inaktiveOppgaver', Api.fetchInaktiveOppgaver, { onError: useStore().setError })
);

const useInaktiveInnbokser = () => (
  useQuery('inaktiveInnbokser', Api.fetchInnbokser, { onError: useStore().setError })
);

const useInaktiveBrukernotifikasjoner = () => (
  [useInaktiveBeskjeder(), useInaktiveOppgaver(), useInaktiveInnbokser()]
);

export default useInaktiveBrukernotifikasjoner;
