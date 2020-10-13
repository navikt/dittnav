import { useState } from 'react';

const useForm = (initialState, sendSubmit) => {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    event.persist();
    setState(st => ({
      ...st,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendSubmit(state);
  };

  return [state, handleChange, handleSubmit];
};

export default useForm;
