window['adrum-start-time'] = new Date().getTime();
(function (config) {
  var appKey = "";
  if (window.location.href.indexOf("www-") > -1) {
    appKey = 'EUM-AAB-AWT';
  } else {
    appKey = 'EUM-AAB-AWU';
  }
  config.appKey = appKey;
  config.adrumExtUrlHttps = 'https://jsagent.adeo.no';
  config.beaconUrlHttps = 'https://eumgw.adeo.no';
  config.xd = {enable: false};
})(window['adrum-config'] || (window['adrum-config'] = {}));