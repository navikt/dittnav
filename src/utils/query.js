import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchOnMount: false,
    },
  },
});

export default queryClient;
