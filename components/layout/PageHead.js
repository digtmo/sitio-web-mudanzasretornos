import Head from "next/head";
import React from "react";

const PageHead = ({ headTitle }) => {
  return (
    <>
      <Head>
        <title>{headTitle ? headTitle : "Mudanzas Retornos | Fletes y Mudanzas"}</title>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
    </>
  );
};

export default PageHead;
