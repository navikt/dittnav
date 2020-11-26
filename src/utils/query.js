import { QueryCache } from 'react-query';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      retry: 0,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
    },
  },
});

export default queryCache;
