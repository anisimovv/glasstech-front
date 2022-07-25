import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SWRConfig } from "swr";
import { request } from "graphql-request";

const fetcher = (query: any) =>
  request(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "", query);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
