import React from "react";
import Layout from "../components/layout/Layout";
import AboutTwo from "../components/sections/AboutTwo";
import CtaThree from "../components/sections/CtaThree";
import FeatureTwo from "../components/sections/FeatureTwo";
import ServiceTwo from "../components/sections/ServiceTwo";
import BannerOne from "./../components/sections/BannerOne";
import CtaTwo from "./../components/sections/CtaTwo";
import NewsOne from "./../components/sections/NewsOne";
import ProjectOne from "./../components/sections/ProjectOne";
import TeamOne from "./../components/sections/TeamOne";
import TestimonialTwo from "./../components/sections/TestimonialTwo";
import WhyChooseTwo from "./../components/sections/WhyChooseTwo";

export default function Home2() {
  return (
    <>
      <Layout HeaderStyle="two">
        <BannerOne />
        <FeatureTwo />
        <AboutTwo />
        <ServiceTwo />
        <CtaThree />
        <ProjectOne />
        <WhyChooseTwo />
        <TeamOne />
        <TestimonialTwo />
        <NewsOne />
        <CtaTwo />
      </Layout>
    </>
  );
}
