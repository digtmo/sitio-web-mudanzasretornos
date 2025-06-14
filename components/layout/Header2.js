import Link from "next/link";
import React from "react";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import Image from "next/image";
import LogoDark from "./../../public/images/logo.png";
import LogoWhite from "./../../public/images/logo-2.png";
import LogoWhite2 from "./../../public/images/logo-3.png";

const Header2 = ({ handleOpen, handleRemove, searchToggle, handleToggle, scroll }) => {
  return (
    <>
      <header className={`main-header header-style-two ${scroll ? "fixed-header" : ""} ${searchToggle ? "moblie-search-active" : ""}`}>
        <div className="header-top">
          <div className="top-left">
            <ul className="list-style-one">
              <li>
                <i className="fa fa-map-marker-alt" /> 380 St Kilda Road, Australia
              </li>
              <li>
                <i className="fa fa-clock" /> Mon - Sat: 8am - 5pm
              </li>
              <li>
                <i className="fa fa-phone-volume" /> <Link href="tel:+92(8800)87890">+92 (8800) 87890</Link>
              </li>
            </ul>
          </div>
          <div className="top-right">
            <ul className="social-icon-one">
              <li>
                <Link href="#">
                  <span className="fab fa-facebook-square" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="fab fa-pinterest-p" />
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="fab fa-instagram" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="header-lower">
          <div className="main-box">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image src={LogoWhite2} title="Tronis" />
                </Link>
              </div>
            </div>
            <div className="nav-outer">
              <nav className="nav main-menu">
                <NavLinks extraClassName="header1" />
              </nav>
              <div className="outer-box">
                <button className="ui-btn ui-btn search-btn" onClick={handleToggle}>
                  <span className="icon lnr lnr-icon-search" />
                </button>
                <Link href="#" className="ui-btn">
                  <i className="lnr-icon-shopping-cart" />
                </Link>
                <Link href="/page-contact" className="theme-btn btn-style-two hvr-light alternate">
                  <span className="btn-title">Get A Quote</span>
                </Link>
                <div className="mobile-nav-toggler" onClick={handleOpen}>
                  <span className="icon lnr-icon-bars" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mobile-menu">
          <div className="menu-backdrop" onClick={handleRemove} />
          <nav className="menu-box">
            <div className="upper-box">
              <div className="nav-logo">
                <Link href="/">
                  <Image src={LogoWhite} title="Tronis" />
                </Link>
              </div>
              <div className="close-btn" onClick={handleRemove}>
                <i className="icon fa fa-times" />
              </div>
            </div>
            <MobileMenu />
            <ul className="contact-list-one">
              <li>
                <div className="contact-info-box">
                  <i className="icon lnr-icon-phone-handset" />
                  <span className="title">Call Now</span>
                  <Link href="/tel:+92880098670">+92 (8800) - 98670</Link>
                </div>
              </li>
              <li>
                <div className="contact-info-box">
                  <span className="icon lnr-icon-envelope1" />
                  <span className="title">Send Email</span>
                  <Link href="/mailto:help@company.com">help@company.com</Link>
                </div>
              </li>
              <li>
                <div className="contact-info-box">
                  <span className="icon lnr-icon-clock" />
                  <span className="title">Send Email</span>
                  Mon - Sat 8:00 - 6:30, Sunday - CLOSED
                </div>
              </li>
            </ul>
            <ul className="social-links">
              <li>
                <Link href="/#">
                  <i className="fab fa-twitter" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <i className="fab fa-facebook-f" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <i className="fab fa-pinterest" />
                </Link>
              </li>
              <li>
                <Link href="/#">
                  <i className="fab fa-instagram" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="search-popup">
          <span className="search-back-drop" />
          <button className="close-search" onClick={handleToggle}>
            <span className="fa fa-times" />
          </button>
          <div className="search-inner">
            <form method="post" action="index">
              <div className="form-group">
                <input type="search" name="search-field" placeholder="Search..." required />
                <button type="submit">
                  <i className="fa fa-search" />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={`sticky-header ${scroll ? "fixed-header animated slideInDown" : ""}`}>
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo">
                <Link href="/" title>
                  <Image src={LogoDark} title="Tronis" />
                </Link>
              </div>
              <div className="nav-outer">
                <nav className="main-menu">
                  <div className="navbar-collapse show collapse clearfix">
                    <MobileMenu />
                  </div>
                </nav>
                <div className="mobile-nav-toggler" onClick={handleOpen}>
                  <span className="icon lnr-icon-bars" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header2;
