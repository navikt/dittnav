import { bool, number, shape } from 'prop-types';

const InnloggingsstatusType = shape({
  authLevel: number.isRequired,
  authenticated: bool.isRequired,
});

export default InnloggingsstatusType;
