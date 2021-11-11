import * as Sentry from '@sentry/browser';
import { Toggle } from '../constants';

const log = (message) => {
  if (!Toggle.IS_TEST) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export const initializeSentry = () => {
  Sentry.init({
    dsn: 'https://075601a148b14886a5bfdc8372b9b8cd@sentry.gc.nav.no/106',
    autoSessionTracking: false,
  });
};

export default log;
