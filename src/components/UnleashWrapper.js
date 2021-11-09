import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { fetchUnleashToggle } from '../Api';

const queryConfig = {
  retry: 0,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

function UnleashWrapper({ toggle, children }) {
  const fetcher = fetchUnleashToggle(toggle);
  const { status, data } = useQuery('unleash', fetcher, queryConfig);
  
  if (status === 'loading' || status === 'error') {
    return null;
  }

  if (data === true) {
    return (<>{children}</>);
  }

  return null;
}

UnleashWrapper.propTypes = {
  toggle: PropTypes.string,
  children: PropTypes.node,
};

UnleashWrapper.defaultProps = {
  toggle: '',
  children: {},
};

export default UnleashWrapper;
