import "../styles/globals.css";
import type { AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import client from "../../apollo-client";
import { SWRConfig } from "swr";
import { request } from "graphql-request";

const fetcher = (query: any) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "", query);

function MyApp({ Component, pageProps }: AppProps) {
  // return (
  //   <ApolloProvider client={client}>
  //     <Component {...pageProps} />
  //   </ApolloProvider>
  // );
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
