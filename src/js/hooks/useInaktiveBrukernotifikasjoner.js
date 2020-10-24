import { useQuery } from 'react-query';
import Api from '../Api';

export const useInaktiveBeskjeder = () => (
  [useQuery('inaktiveBeskjeder', Api.fetchInaktiveBeskjeder)]
);

export const useInaktiveOppgaver = () => (
  [useQuery('inaktiveOppgaver', Api.fetchInaktiveOppgaver)]
);

export const useInaktiveInnbokser = () => (
  [useQuery('inaktiveInnbokser', Api.fetchInnbokser)]
);
