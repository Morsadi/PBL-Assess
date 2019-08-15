import React from "react";

export const About = props => {
  return (
    <div className="about">
      <h1 style={{ color: props.style.text_color }}>
        Project Based Teaching Rubric
      </h1>

      <p style={{ color: props.style.text_color }}>
        This app was inspired by PBLWorks organization encouraging teachers and
        school leaders to use the PBL rubric to reflect on their practice and
        plan for professional growth.
      </p>
      <p style={{ color: props.style.text_color }} className="quote">
        "This rubric describes beginning, developing, and Gold Standard levels
        for Project Based Teaching Practices for K-12 teachers and features
        detailed, concrete indicators that illustrate what it means to teach in
        a PBL environment."
        <span>
          <a
            style={{ color: props.style.text_color }}
            href="https://twitter.com/pblworks"
            rel="noopener noreferrer"
            target="_blank"
          >
            {" "}
            -- PBLWorks
          </a>
        </span>
      </p>
    </div>
  );
};

export default About;
