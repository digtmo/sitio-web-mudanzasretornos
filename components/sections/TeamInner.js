import Link from "next/link";
import React from "react";

const TeamOne = () => {
  const data = [
    {
      img: "team-1.jpg",
      title: "Rebecca Tylor",
      desig: "Manager",
    },
    {
      img: "team-2.jpg",
      title: "Jane seymour",
      desig: "Marketing",
    },
    {
      img: "team-3.jpg",
      title: "Jessca Arow",
      desig: "Developer",
    },
    {
      img: "team-4.jpg",
      title: "Edward norton",
      desig: "Manager",
    },
    {
      img: "team-5.jpg",
      title: "Tina Martin",
      desig: "Marketing",
    },
    {
      img: "team-6.jpg",
      title: "Devid James",
      desig: "Developer",
    },
  ];
  return (
    <>
      <section className="team-section">
        <div className="auto-container">
          <div className="row">
            {data.map((item, i) => (
              <div className="team-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <Link href="/page-team-details">
                        <img src={`images/resource/${item.img}`} title="Tronis" />
                      </Link>
                    </figure>
                    <div className="social-links">
                      <Link href="#">
                        <i className="fab fa-facebook-f" />
                      </Link>
                      <Link href="#">
                        <i className="fab fa-twitter" />
                      </Link>
                      <Link href="#">
                        <i className="fab fa-pinterest-p" />
                      </Link>
                      <Link href="#">
                        <i className="fab fa-instagram" />
                      </Link>
                    </div>
                  </div>
                  <div className="info-box">
                    <span className="designation">{item.desig}</span>
                    <h4 className="name">
                      <Link href="/page-team-details">{item.title}</Link>
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

export default TeamOne;
