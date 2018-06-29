function createEnvSettingsFile() {
  return `window.appSettings = {
            REST_API_URL: '${process.env.DITTNAV_API_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}'
        };`;
}

module.exports = createEnvSettingsFile;
