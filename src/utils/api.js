export const buildApiUrl = (path) => {
  const apiBaseUrl = window.env.DITTNAV_API_URL;

  return `${apiBaseUrl}${path || ''}`;
};

export const buildTestProducerUrl = (path) => {
  const testProducerBaseUrl = window.env.EVENT_TEST_PRODUCER_URL;

  return `${testProducerBaseUrl}${path || ''}`;
};

export const buildTidslinjeUrl = (path, queryString) => {
  const tidslinjeBaseUrl = window.env.TIDSLINJE_URL;

  return `${tidslinjeBaseUrl}${path || ''}${queryString || ''}`;
};

export const buildNavNoUrl = (path) => {
  const navNoBaseUrl = window.env.NAVNO_URL;

  return `${navNoBaseUrl}${path || ''}`;
};

export const buildLoginserviceUrl = (level) => {
  const loginUrlPath = window.location.pathname.includes('/varslinger') ? `${window.env.LOGIN_URL}/varslinger` : window.env.LOGIN_URL;
  const loginserviceUrl = window.location.search ? `${loginUrlPath}/${window.location.search}` : loginUrlPath;
  const loginServiceLevelFourUrl = window.env.LOGIN_LEVEL_4_URL;

  return level ? loginServiceLevelFourUrl : loginserviceUrl;
};
