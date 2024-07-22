import Link from "next/link";
import React from "react";

const PageTitle = (props) => {
  return (
    <section className="page-title" style={{ backgroundImage: "url(images/resource/page-title-bg.jpg)" }}>
      <div className="auto-container">
        <div className="title-outer">
          <h1 className="title">{props.pageName}</h1>
          <ul className="page-breadcrumb">
            <li>
              <Link href="/">Inicio</Link>
            </li>

            <li>{props.pageName}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
