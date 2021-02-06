import { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { useApollo } from '@/lib/apolloClient';
import GlobalStyle from '@/components/GlobalStyle';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ChakraProvider>
      <ApolloProvider client={apolloClient}>
        <CSSReset />
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <Component {...pageProps} />
        <GlobalStyle />
      </ApolloProvider>
    </ChakraProvider>
  );
};

export default App;
