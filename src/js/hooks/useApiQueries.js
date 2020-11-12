import usePerson from './usePerson';
import useInnloggingsstatus from './useInnloggingsstatus';
import useBrukernotifikasjoner from './useBrukernotifikasjoner';
import useInaktiveBrukernotifikasjoner from './useInaktiveBrukernotifikasjoner';
import useSaker from './useSaker';

const useApiQueries = () => (
  [useBrukernotifikasjoner(), useInaktiveBrukernotifikasjoner(), usePerson(), useSaker(), useInnloggingsstatus()]
);

export default useApiQueries;
