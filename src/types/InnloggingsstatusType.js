import { shape, string } from 'prop-types';

const InnloggingsstatusType = shape({
  securityLevel: string.isRequired,
});

export default InnloggingsstatusType;
