import Api from '../Api';

const checkIfModalShouldBeToggled = (headers, toggleInnloggingsModal) => {
  if (Api.tokenExpiresSoon(headers)) {
    toggleInnloggingsModal();
  }
};

export default checkIfModalShouldBeToggled;
