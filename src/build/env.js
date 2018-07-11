function createEnvSettingsFile() {
  return `window.dittnavSettings = {
            DITTNAV_API_URL: '${process.env.DITTNAV_API_URL}',
            SAKSOVERSIKT_API_URL: '${process.env.SAKSOVERSIKT_API_URL}',
            SAKSOVERSIKT_URL: '${process.env.SAKSOVERSIKT_URL}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}'
        };`;
}

module.exports = createEnvSettingsFile;
