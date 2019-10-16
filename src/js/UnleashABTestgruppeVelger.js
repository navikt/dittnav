const unleashABTestgruppeVelger = (api, featureTestPool, featureABSplit) => {
  return new Promise((res, rej) => {
    api.fetchUnleashFeatures([featureTestPool, featureABSplit])
    .then((features) => {
      if (features[featureTestPool]) {
        if (features[featureABSplit]) {
          res('A');
        } else {
          res('B');
        }
      } else {
        res(null);
      }
    })
    .catch((e) => {
      rej(e);
    });
  })
};

export default unleashABTestgruppeVelger;
