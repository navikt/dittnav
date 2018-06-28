const fsExtra = require('fs-extra');

function createEnvSettingsFile(settingsFile) {
  fsExtra.ensureFile(settingsFile).then(() => {
    fsExtra.writeFileSync(
      settingsFile,
      `window.appSettings = {
                REST_API_URL: '${process.env.DITTNAV_API_URL}',
                LOGIN_URL: '${process.env.LOGINSERVICE_URL}'
            };`,
    );
  });
}
module.exports = createEnvSettingsFile;
