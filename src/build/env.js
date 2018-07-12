function createEnvSettingsFile() {
  return `window.dittnavSettings = {
            DITTNAV_API_URL: '${process.env.DITTNAV_API_URL}',
            SAKSOVERSIKT_API_URL: '${process.env.SAKSOVERSIKT_API_URL}',
            SAKSOVERSIKT_URL: '${process.env.SAKSOVERSIKT_URL}',
            REG_STATUS_LINK: '${process.env.REG_STATUS_LINK}',
            LOGIN_URL: '${process.env.LOGINSERVICE_URL}'
        };`;
}

module.exports = createEnvSettingsFile;
