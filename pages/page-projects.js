import React from 'react';
import Layout from "../components/layout/Layout";
import ProjectInner from "../components/sections/ProjectInner";
import PageTitle from "../components/sections/PageTitle";

export default function Home() {

    return (
        <>
            <Layout HeaderStyle="one">
                <PageTitle pageName="Projects Grid" />
                <ProjectInner />
            </Layout>
        </>
    )
}
