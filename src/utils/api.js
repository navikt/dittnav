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
  const loginserviceUrl = `${window.env.LOGIN_URL}/${window.location.search}`;
  const loginServiceLevelFourUrl = window.env.LOGIN_LEVEL_4_URL;

  return level ? loginServiceLevelFourUrl : loginserviceUrl;
};
