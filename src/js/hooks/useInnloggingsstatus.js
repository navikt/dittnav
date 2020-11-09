import { useQuery } from 'react-query';
import Api from '../Api';
import useStore from './useStore';

const useInnloggingsstatus = () => (
  [useQuery('innloggingsstatus', Api.fetchInnloggingsstatus, { onError: useStore().setError })]
);

export default useInnloggingsstatus;
