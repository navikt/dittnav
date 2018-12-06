const props = (window.dittnav || {}); // eslint-disable-line no-undef

Object
  .keys(props)
  .forEach((key) => {
    if (key.indexOf('PUBLIC_') >= 0) {
      props[`${key}xxx`] = props[key];
      delete props[key];
    }
  });

props.SERVICES_URL = window.location.origin;

export default {
  dittNav: props,
  MELDINGER_NAV_PATH: '/sbl/as/minside/meldinger/meldingerNAV.do',
  ARBEID_PATH: '/sbl/nav_security_check',
  MELDEKORT_PATH: '/meldekort/',
  MININNBOKS_UBEHANDLET_URL: '/tjenester/sporsmal/ubehandlet',
  ARBEID_LOGIN_LINK_URL: '/sbl/arbeid/innlogging',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
};
