import React from "react";
import Layout from "../components/layout/Layout";
import PageTitle from "../components/sections/PageTitle";
import ProjectDetails from "../components/sections/ProjectDetails";

export default function Home() {
  return (
    <>
      <Layout HeaderStyle="one">
        <PageTitle pageName="Project Details" />
        <ProjectDetails />
      </Layout>
    </>
  );
}
