import React from "react";

const TrackingOne = () => {
  return (
    <>
      <section className="tracking-section pull-down">
        <div className="auto-container">
          <div className="outer-box">
            <div className="arrow-box wow fadeInRight">
              <img src="images/icons/arrow-2.png" title="Tronis" className="icon" />
              <span className="title">
                Results in <br />
                few seconds
              </span>
            </div>
            <div className="tracking-form">
              <h4 className="title">
                Track your <br />
                Order
              </h4>
              {/* Tracking Form */}
              <form method="post">
                <div className="row">
                  <div className="form-group col-lg-4 col-md-12 col-sm-12">
                    <span className="icon lnr-icon-user" />
                    <input type="text" name="field_name" placeholder="Your Tracking ID Now" />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-4 col-md-12 col-sm-12">
                    <span className="icon lnr-icon-envelope1" />
                    <input type="text" name="field_name" placeholder="Your Email Address" />
                  </div>
                  {/* Form Group */}
                  <div className="form-group col-lg-4 col-md-12 col-sm-12 text-end">
                    <button type="submit" className="theme-btn btn-style-one">
                      <span className="btn-title">Track Order</span>
                    </button>
                  </div>
                </div>
              </form>
              {/* End Tracking Form */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackingOne;
