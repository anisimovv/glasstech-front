import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import client from "../../apollo-client";
import Layout from "../components/Layout";
import Shower from "../components/Shower";
import { IShower } from "../types";

const Home: NextPage<{ showers: IShower[] }> = ({ showers }) => {
  return (
    <Layout>
      <Shower showers={showers} />
    </Layout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await client.query({
    query: gql`
      query Showers {
        showers {
          id
          name
          minPrice
          maxPrice
          elements {
            id
            title
            maxValue
            minValue
            defaultValue
            type
          }
          bindings {
            id
            title
            price
          }
        }
      }
    `,
  });

  return {
    props: {
      showers: data?.showers,
    },
  };
};
function initializeApollo() {
  throw new Error("Function not implemented.");
}
