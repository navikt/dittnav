import { useQuery } from 'react-query';
import Api from '../Api';

const useInnloggingsstatus = () => (
  [useQuery('innloggingsstatus', Api.fetchInnloggingsstatus)]
);

export default useInnloggingsstatus;
