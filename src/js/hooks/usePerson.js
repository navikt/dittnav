import { useQuery } from 'react-query';
import Api from '../Api';

export const useOppfolging = () => (
  [useQuery('oppfolging', Api.fetchOppfolging)]
);

export const useMeldekort = () => (
  [useQuery('meldekort', Api.fetchMeldekort)]
);

export const useMeldinger = () => (
  [useQuery('meldinger', Api.fetchMeldinger)]
);

export const useNavn = () => (
  [useQuery('navn', Api.fetchPersonNavn)]
);

export const useIdent = () => (
  [useQuery('ident', Api.fetchPersonIdent)]
);
