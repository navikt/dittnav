import { useQuery } from 'react-query';
import Api from '../Api';
import useStore from './useStore';

export const useOppfolging = () => (
  [useQuery('oppfolging', Api.fetchOppfolging, { onError: useStore().setError })]
);

export const useMeldekort = () => (
  [useQuery('meldekort', Api.fetchMeldekort, { onError: useStore().setError })]
);

export const useMeldinger = () => (
  [useQuery('meldinger', Api.fetchMeldinger, { onError: useStore().setError })]
);

export const useIdent = (enabled) => (
  [useQuery('ident', Api.fetchPersonIdent, { enabled, onError: useStore().setError })]
);

export const useNavn = () => (
  [useQuery('navn', Api.fetchPersonNavn, { onError: useIdent })]
);

const usePerson = () => (
  [useOppfolging(), useMeldekort(), useMeldinger(), useIdent(), useNavn()]
);

export default usePerson;
