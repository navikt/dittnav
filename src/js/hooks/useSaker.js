import { useQuery } from 'react-query';
import Api from '../Api';

export const useSakstema = () => (
  [useQuery('sakstema', Api.fetchSakstema)]
);

// TODO: change name to paabegynte.
export const useSaker = () => (
  [useQuery('saker', Api.fetchSaker)]
);
