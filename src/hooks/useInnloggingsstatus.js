import { useQuery } from 'react-query';
import { fetchInnloggingsstatus } from '../Api';
import useStore from './useStore';

const useInnloggingsstatus = () => (
  [useQuery('innloggingsstatus', fetchInnloggingsstatus, { onError: useStore().setError })]
);

export default useInnloggingsstatus;
