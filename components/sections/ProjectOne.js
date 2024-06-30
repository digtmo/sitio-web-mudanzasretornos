import React from "react";
import ProjectSlider from "./../slider/Projects";

const ProjectOne = ({ addClass }) => {
  return (
    <>
      <section className={`project-section ${addClass}`}>
        <div className="large-container">
          <div className="sec-title text-center">
            <span className="sub-title">LATEST PROJECTS</span>
            <h2>Works across the world</h2>
          </div>
          {/* Prject Carousel */}
          <div className="project-carousel">
            <ProjectSlider />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectOne;
