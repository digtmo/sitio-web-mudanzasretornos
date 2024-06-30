import React from "react";
import Link from "next/link";
import ProjectSlider from "./../slider/Projects";

const ProjectOne = ({ addClass }) => {
  const data = [
    {
      img: "project-1.jpg",
      title: "Special transport",
      subTitle: "Logistics",
    },
    {
      img: "project-2.jpg",
      title: "Air Freight Solution",
      subTitle: "Logistics",
    },
    {
      img: "project-3.jpg",
      title: "Supply Chain",
      subTitle: "Logistics",
    },
    {
      img: "project-4.jpg",
      title: "Security For Cargo",
      subTitle: "Logistics",
    },
    {
      img: "project-5.jpg",
      title: "Shipment Tracking",
      subTitle: "Logistics",
    },
    {
      img: "project-6.jpg",
      title: "Warehouse Inventory",
      subTitle: "Logistics",
    },
  ];
  return (
    <>
      <section className="project-section">
        <div className="auto-container">
          <div className="row">
            {data.map((item, i) => (
              <div className="project-block mb-4 col-xl-4 col-lg-4 col-md-6 col-sm-12 wow fadeInUp">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <a href="images/resource/project-1.jpg" className="lightbox-image">
                        <img src={`images/resource/${item.img}`} title="Tronis" />
                      </a>
                    </figure>
                    <Link href="/page-project-details" className="icon">
                      <i className="fa fa-plus" />
                    </Link>
                  </div>
                  <div className="content-box">
                    <span className="sub-title">{item.subTitle}</span>
                    <h4 className="title">
                      <Link href="/page-project-details">{item.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectOne;
