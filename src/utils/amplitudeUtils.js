import amplitude from 'amplitude-js';
import { Toggle } from '../constants';

let initialized = false;

const amplitudeUrl = 'amplitude.nav.no/collect';

// PO Arbeid - prod
const amplitudeProdKey = 'b0bccdd4dd75081606ef7bcab668a7ed';

// PO Arbeid - test
const amplitudeTestKey = '2f190e67f31d7e4719c5ff048ad3d3e6';

function initAmplitude() {
  if (Toggle.IS_TEST) {
    return;
  }
  const erProduksjon = !Toggle.IS_DEV;
  const amplitudeKey = erProduksjon ? amplitudeProdKey : amplitudeTestKey;

  const config = {
    apiEndpoint: amplitudeUrl,
    saveEvents: true,
    includeUtm: true,
    includeReferrer: true,
    trackingOptions: {
      city: false,
      ip_address: false,
    },
  };
  amplitude.getInstance()
    .init(amplitudeKey, undefined, config);
  initialized = true;
}

initAmplitude();

export function amplitudeLogger(name, values) {
  if (!initialized) {
    return;
  }
  amplitude.getInstance()
    .logEvent(name, values);
}

export function loggAktivitet(aktivitet, data) {
  const eventData = { ...data, aktivitet };
  amplitudeLogger('dittnav.aktivitet', eventData);
}
