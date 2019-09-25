// PB-162 : brukes til å feature-toggle for visning av hendelser
const Environments = () => {
  
  try {
    if (process.env.NODE_ENV === 'test') return 'TEST'
  } catch (e) {}

  const host = window.location.hostname;

  if (host.indexOf('localhost') > -1) {
    return 'DEV';
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
