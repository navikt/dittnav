import { useState } from 'react';

const useModal = () => {
  const [visModal, setVisModal] = useState(false);

  const toggleModal = () => (
    setVisModal(true)
  );

  /* no-op */
  const handleModal = () => null;

  return [visModal, toggleModal, handleModal];
};

export default useModal;
