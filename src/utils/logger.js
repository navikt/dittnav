import { Toggle } from '../constants';

const log = (message) => {
  if (!Toggle.IS_TEST) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export default log;
