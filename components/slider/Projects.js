import Link from "next/link";
import React from "react";
import SwiperCore, { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Autoplay, Navigation]);
const ProjectSlider = () => {
  const data = [
    {
      img: "project-1.jpg",
      title: "Special transport",
      subTitle: "Logistics",
    },
    {
      img: "project-2.jpg",
      title: "Special transport",
      subTitle: "Logistics",
    },
    {
      img: "project-3.jpg",
      title: "Special transport",
      subTitle: "Logistics",
    },
    {
      img: "project-4.jpg",
      title: "Special transport",
      subTitle: "Logistics",
    },
    // {
    //     img: "project-5.jpg",
    //     title: "Special transport",
    //     price: 49.00,
    //     lesson: 8,
    //     students: 16,
    // },
  ];

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".owl-prev-course-1",
          nextEl: ".owl-next-course-1",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            // spaceBetween: 30,
          },
          575: {
            slidesPerView: 1,
            // spaceBetween: 30,
          },
          767: {
            slidesPerView: 1,
            // spaceBetween: 30,
          },
          991: {
            slidesPerView: 2,
            // spaceBetween: 30,
          },
          1199: {
            slidesPerView: 3,
            // spaceBetween: 30,
          },
          1350: {
            slidesPerView: 4,
            // spaceBetween: 30,
          },
        }}
        className=""
      >
        {data.map((item, i) => (
          <SwiperSlide>
            <div className="project-block">
              <div className="inner-box">
                <div className="image-box">
                  <figure className="image">
                    <Link href="/page-project-details" Link className="lightbox-image">
                      <img src={`images/resource/${item.img}`} title="Tronis" />
                    </Link>
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
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProjectSlider;
