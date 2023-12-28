// import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 60,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center", padding: "20px" }}>
        &copy; {(new Date().getFullYear())}
          <span>
            <Link
              style={{ color: "white" }}
              className="nav-link"
              to={"https://shridhar-mugalkhod.github.io/portfolio/"}
            >
              Shridhar Mugalkhod.
            </Link></span>All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
