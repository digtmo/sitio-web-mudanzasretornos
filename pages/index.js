import React from "react";
import Layout from "../components/layout/Layout";
import AboutOne from "../components/sections/AboutOne";
import CtaOne from "../components/sections/CtaOne";
import FeatureOne from "../components/sections/FeatureOne";
import FunFactOne from "../components/sections/FunFactOne";
import AboutThree from "./../components/sections/AboutThree";
import ClientOne from "./../components/sections/ClientOne";
import ProjectOne from "./../components/sections/ProjectOne";
import ServiceOne from "./../components/sections/ServiceOne";
import TestimonialOne from "./../components/sections/TestimonialOne";
import TrackingOne from "./../components/sections/TrackingOne";
import WhyChooseOne from "./../components/sections/WhyChooseOne";
import WorkOne from "./../components/sections/WorkOne";
import OfferOne from "./../components/sections/OfferOne";
import NewsOne from "./../components/sections/NewsOne";
import BannerOne from "../components/sections/BannerOne";
import MainComponent from "../components/cotizador/cotizador";

export default function Home() {
  return (
    <>
      <Layout HeaderStyle="one">
        <BannerOne />
       {/*  <FeatureOne /> */}
        <AboutOne />
        <ServiceOne />
       {/*  <TrackingOne /> */}
        <CtaOne />
        <WorkOne />
        <MainComponent />
        <FunFactOne />
       {/*  <WhyChooseOne /> */}
        <AboutThree />
        <TestimonialOne />
       {/*  <OfferOne /> */}
        {/* <NewsOne /> */}
       {/*  <ClientOne /> */}
      </Layout>
    </>
  );
}
