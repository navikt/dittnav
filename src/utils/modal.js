import { tokenExpiresSoon } from '../Api';

const checkIfModalShouldBeToggled = (headers, toggleInnloggingsModal) => {
  if (tokenExpiresSoon(headers)) {
    toggleInnloggingsModal();
  }
};

export default checkIfModalShouldBeToggled;
