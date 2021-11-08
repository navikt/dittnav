import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

const queryConfig = {
  retry: 0,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

const fetchUnleashToggle = async (toggle) => {
  const url = `/${toggle}`;
  const response = await fetch(url);

  return response.json();
};

function UnleashWrapper({ toggle, children }) {
  const { status, data } = useQuery('unleash', fetchUnleashToggle(toggle), queryConfig);
  
  if (status === 'loading') {
    return null;
  }

  if (data === true) {
    return <>{children}</>;
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
