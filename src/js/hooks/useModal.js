import { useState } from 'react';

const useModal = () => {
  const [visModal, setVisModal] = useState(false);

  const toggleModal = () => (
    setVisModal(true)
  );

  const handleModal = () => null;

  return [visModal, toggleModal, handleModal];
};

export default useModal;