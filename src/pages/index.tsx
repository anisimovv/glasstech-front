import type { NextPage } from "next";
import Layout from "../components/Layout";
import Shower from "../components/Shower";
import { IShower } from "../types";

const Home: NextPage<{ showers: IShower[] }> = ({ showers }) => {
  return (
    <Layout>
      <Shower />
    </Layout>
  );
};

export default Home;
