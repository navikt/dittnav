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

function UnleashWrapper ({ toggle, children }) {
  if (!toggle) return null;
  if (!children) return null;
  const { status, data } = useQuery('unleash', fetchUnleashToggle(toggle), queryConfig);

  if (status === 'loading') {
    return null;
  }

  if (data === true) {
    return <>{children}</>;
  }

  return null;
}

export default UnleashWrapper