import React from "react";
import Brand from "../slider/Brand";

const ClientOne = () => {
  return (
    <>
      <section className="clients-section">
        <div className="anim-icon">
          <span className="icon dotted-line-1" />
          <span className="icon dotted-line-2" />
        </div>
        <div className="auto-container">
          {/* Sponsors Outer */}
          <div className="sponsors-outer">
            {/*clients carousel*/}
            <div className="clients-carousel">
              <Brand />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientOne;
