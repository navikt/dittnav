// PB-162 : brukes til å feature-toggle for visning av hendelser
const Environments = () => {
  const host = window.location.hostname;

  if (host.indexOf('localhost') > -1) {
    return 'LOCAL';
  }

  if (host.indexOf('www-q0') > -1) {
    return 'DEV';
  }

  if (host.indexOf('www-q1') > -1) {
    return 'DEV';
  }

  return 'PROD';
};

export default Environments;
