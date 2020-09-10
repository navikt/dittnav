import { useContext } from 'react';
import { StoreContext } from '../context/StoreProvider';

const useStore = () => useContext(StoreContext);

export default useStore;
