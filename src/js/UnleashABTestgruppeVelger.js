import api from './Api';

const unleashABTestgruppeVelger = (featureTestPool, featureABSplit, callback) => {
  api.fetchUnleashFeatures([featureTestPool, featureABSplit])
    .then((features) => {
      if (features[featureTestPool]) {
        if (features[featureABSplit]) {
          callback('A');
        } else {
          callback('B');
        }
      } else {
        callback(null);
      }
    })
    .catch((e) => {
      callback(null, e);
    });
};

export default unleashABTestgruppeVelger;
