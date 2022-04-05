import { useQuery } from 'react-query';
import { fetchSakstema } from '../Api';
import useStore from './useStore';

export const useSakstema = () => (
  [useQuery('sakstema', fetchSakstema, { onError: useStore().setError })]
);

const useSaker = () => (
  [useSakstema()]
);

export default useSaker;
