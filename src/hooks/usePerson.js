import { useQuery } from 'react-query';
import { fetchOppfolging, fetchMeldekort, fetchMeldinger, fetchPersonIdent, fetchPersonNavn } from '../Api';
import useStore from './useStore';

export const useOppfolging = () => (
  [useQuery('oppfolging', fetchOppfolging, { onError: useStore().setError })]
);

export const useMeldekort = () => (
  [useQuery('meldekort', fetchMeldekort, { onError: useStore().setError })]
);

export const useMeldinger = () => (
  [useQuery('meldinger', fetchMeldinger, { onError: useStore().setError })]
);

export const useIdent = (enabled) => (
  [useQuery('ident', fetchPersonIdent, { enabled, onError: useStore().setError })]
);

export const useNavn = () => (
  [useQuery('navn', fetchPersonNavn, { onError: useStore().setError })]
);

const usePerson = () => (
  [useOppfolging(), useMeldekort(), useMeldinger(), useNavn()]
);

export default usePerson;
