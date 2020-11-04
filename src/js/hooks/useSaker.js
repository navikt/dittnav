import { useQuery } from 'react-query';
import Api from '../Api';
import useStore from './useStore';

export const useSakstema = () => (
  [useQuery('sakstema', Api.fetchSakstema, { onError: useStore().setError })]
);

export const usePaabegynteSoknader = () => (
  [useQuery('paabegynteSoknader', Api.fetchSaker, { onError: useStore().setError })]
);

const useSaker = () => (
  [useSakstema(), usePaabegynteSoknader()]
);

export default useSaker;
