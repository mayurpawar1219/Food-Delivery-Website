import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer_dev">
      <div className="footer-content">
        <div className="footer-left">
          <img
            src={assets.food_delivery}
            alt="Zomato Logo"
            className="footer-logo"
          />
        </div>

        <div className="footer-center">
          <h2>ABOUT ZOMATO</h2>
          <ul>
            <li>Who We Are</li>
            <li>Blog</li>
            <li>Work With Us</li>
            <li>Investor Relations</li>
            <li>Report Fraud</li>
            <li>Press Kit</li>
            <li>
              <a href="tel:8567234456" className="contact-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-center">
          <h2>ZOMAVERSE</h2>
          <ul>
            <li>Zomato</li>
            <li>Blinkit</li>
            <li>Feeding India</li>
            <li>Hyperpure</li>
            <li>Zomato Live</li>
            <li>Zomaland</li>
            <li>Weather Union</li>
          </ul>
        </div>

        <div className="footer-center">
          <h2>FOR RESTAURANTS</h2>
          <ul>
            <li>Partner With Us</li>
            <li>Apps For You</li>
          </ul>
        </div>

        <div className="footer-center">
          <h2>LEARN MORE</h2>
          <ul>
            <li>Privacy</li>
            <li>Security</li>
            <li>Terms</li>
          </ul>
        </div>

        <div className="footer-right">
          <h2>SOCIAL LINKS</h2>
          <div className="footer-social-icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>

        <div className="footer-apps" id="footer-apps">
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.app_store} alt="App Store" />
          </a>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={assets.play_store} alt="Google Play" />
          </a>
        </div>
      </div>{" "}
      {/* ✅ Properly closing the footer-content div */}
      <hr />
      <p className="footer-copyright">
        &copy; 2025 Zomato Ltd. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
