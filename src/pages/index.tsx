import { gql } from "@apollo/client";
import type { GetStaticProps, NextPage } from "next";
import client from "../../apollo-client";
import { IShower } from "../types";

const Home: NextPage<{ showers: IShower[] }> = ({ showers }) => {
  return <div />;
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
