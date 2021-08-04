const appdynamics = require('appdynamics');
const dotenv = require('dotenv');

dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_account_access_key.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_account_name.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_controller_port.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_hostname.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_ssl_enabled.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_tier_name.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_application_name.env' });
dotenv.config({ path: '/var/run/secrets/nais.io/vault/appd_node_name.env' });

appdynamics.profile({
  controllerHostName: process.env.APPDYNAMICS_CONTROLLER_HOST_NAME,
  controllerPort: process.env.APPDYNAMICS_CONTROLLER_PORT,
  controllerSslEnabled: process.env.APPDYNAMICS_CONTROLLER_SSL_ENABLED,
  accountName: process.env.APPDYNAMICS_AGENT_ACCOUNT_NAME,
  accountAccessKey: process.env.APPDYNAMICS_AGENT_ACCOUNT_ACCESS_KEY,
  tierName: process.env.APPDYNAMICS_TIER_NAME,
  nodeName: process.env.APPDYNAMICS_NODE_NAME,
  applicationName: process.env.APPDYNAMICS_APPLICATION_NAME,
});
