import React from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "../pages/HomePage";

const Home = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
};

export default Home;
