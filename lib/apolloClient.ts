import { useMemo } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  from,
  HttpLink,
} from '@apollo/client';
import { createStandaloneToast } from '@chakra-ui/react';
import { onError } from '@apollo/client/link/error';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const toast = createStandaloneToast();

  if (graphQLErrors) {
    graphQLErrors.map(({ message }) =>
      toast({
        title: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      }),
    );
  }

  if (networkError) {
    toast({
      title: 'Network Error',
      description: networkError,
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top',
    });
  }
});

function createIsomorphLink() {
  return new HttpLink({
    uri:
      'https://api-us-east-1.graphcms.com/v2/ckkt3ejojinb701ywbg8zfrzj/master',
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, createIsomorphLink()]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  if (typeof window === 'undefined') {
    return _apolloClient;
  }

  if (!apolloClient) {
    apolloClient = _apolloClient;
  }

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any,
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
