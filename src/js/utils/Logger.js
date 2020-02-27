import Config from '../globalConfig';

const log = (message) => {
  if (!Config.IS_TEST) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
};

export default log;
