import { useQuery } from 'react-query';
import { fetchSakstema, fetchSaker } from '../Api';
import useStore from './useStore';

export const useSakstema = () => (
  [useQuery('sakstema', fetchSakstema, { onError: useStore().setError })]
);

export const usePaabegynteSoknader = () => {
  const store = useStore();

  const checkForFeilendeBaksystem = (data) => {
    if (data.content.feilendeBaksystem.length > 0) {
      store.setError();
    }
  };

  return [useQuery('paabegynteSoknader', fetchSaker, { onSuccess: checkForFeilendeBaksystem, onError: store.setError })];
};

const useSaker = () => (
  [useSakstema()]
);

export default useSaker;
