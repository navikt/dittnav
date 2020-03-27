import { useContext } from 'react';
import { BeskjedStoreContext } from '../context/BeskjedStoreProvider';

const useBeskjedStore = () => useContext(BeskjedStoreContext);

export default useBeskjedStore;
