import { useQuery } from 'react-query';
import Api from '../Api';
import useStore from './useStore';

export const useSakstema = () => (
  [useQuery('sakstema', Api.fetchSakstema, { onError: useStore().setError })]
);

export const usePaabegynteSoknader = () => {
  const store = useStore();

  const checkForFeilendeBaksystem = (data) => {
    if (data.content.feilendeBaksystem.length > 0) {
      store.setError();
    }
  };

  return [useQuery('paabegynteSoknader', Api.fetchSaker, { onSuccess: checkForFeilendeBaksystem, onError: store.setError })];
};

const useSaker = () => (
  [useSakstema(), usePaabegynteSoknader()]
);

export default useSaker;
