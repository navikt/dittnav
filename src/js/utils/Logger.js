import Config from '../globalConfig';

const log = (message) => {
  if (!Config.IS_TEST) {
    console.log(message);
  }
};

export default log;
