import { useQuery } from 'react-query';
import { fetchOppfolging, fetchMeldekort, fetchIdent, fetchNavn } from '../Api';
import useStore from './useStore';

export const useOppfolging = () => (
  [useQuery('oppfolging', fetchOppfolging, { onError: useStore().setError })]
);

export const useMeldekort = () => (
  [useQuery('meldekort', fetchMeldekort, { onError: useStore().setError })]
);

export const useIdent = (enabled) => (
  [useQuery('ident', fetchIdent, { enabled, onError: useStore().setError })]
);

export const useNavn = () => (
  [useQuery('navn', fetchNavn, { onError: useStore().setError })]
);

const usePerson = () => (
  [useOppfolging(), useMeldekort(), useNavn()]
);

export default usePerson;
