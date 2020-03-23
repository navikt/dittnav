import { shape, string } from 'prop-types';

const InnloggingType = shape({
  securityLevel: string.isRequired,
});

export default InnloggingType;
