import Link from "next/link";
import React from "react";

const NewsOne = () => {
  const data = [
    {
      img: "news-1.jpg",
      title: "We very careful handling the valuable goods",
      comment: 2,
    },
    {
      img: "news-2.jpg",
      title: "Why is supply chain visibility so important?",
      comment: 10,
    },
    {
      img: "news-3.jpg",
      title: "Cargo flow through better supply in UK",
      comment: 5,
    },
    {
      img: "news-4.jpg",
      title: "Calculate volume weight for air freight",
      comment: 2,
    },
    {
      img: "news-5.jpg",
      title: "Will supply chains become supply circles?",
      comment: 10,
    },
    {
      img: "news-6.jpg",
      title: "About 9 stages of logistical management",
      comment: 5,
    },
  ];
  return (
    <>
      <section className="news-section">
        <div className="anim-icons">
          <div className="float-image wow zoomInLeft">
            <img src="images/resource/float-img-2.png" title="Tronis" />
          </div>
        </div>
        <div className="auto-container">
          <div className="row">
            {data.map((item, i) => (
              <div className="news-block col-lg-4 col-md-6 col-sm-12">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <Link href="/news-details">
                        <img src={`images/resource/${item.img}`} title="Tronis" />
                      </Link>
                    </figure>
                    <span className="date">
                      <b>28</b> SEP
                    </span>
                  </div>
                  <div className="lower-content">
                    <ul className="post-info">
                      <li>
                        <i className="fa fa-user" /> by Admin
                      </li>
                      <li>
                        <i className="fa fa-comments" /> {item.comment} Comments
                      </li>
                    </ul>
                    <h4 className="title">
                      <Link href="/news-details">{item.title}</Link>
                    </h4>
                    <Link href="/news-details" className="read-more">
                      Read More <i className="fa fa-angle-right" />
                    </Link>
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

export default NewsOne;
