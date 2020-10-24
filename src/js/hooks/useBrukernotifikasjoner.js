import { useQuery } from 'react-query';
import Api from '../Api';

export const useBeskjeder = () => (
  [useQuery('beskjeder', Api.fetchBeskjeder)]
);

export const useOppgaver = () => (
  [useQuery('oppgaver', Api.fetchOppgaver)]
);

export const useInnbokser = () => (
  [useQuery('innbokser', Api.fetchInnbokser)]
);
