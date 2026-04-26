import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">
      <h1> who are we</h1>

      <p className="about-text">We are an online store striving to offer the best products with high quality and competitive prices,
with an easy and secure shopping experience for all our customers.
      </p>

      <div className="about-sections">
        <div className="about-box">
          <h3>🎯 our vision</h3>
          <p>To be the first choice for online shopping through trust,
quality, and speed of service.
          </p>
        </div>

        <div className="about-box">
          <h3>💡 our mission</h3>
          <p>Providing carefully selected products that meet our customers' needs,
with ongoing support and an exceptional user experience.
          </p>
        </div>

        <div className="about-box">
          <h3>🤝 why us ?</h3>
          <p>• Fast delivery

• Secure payment

• Ongoing technical support

• Customer satisfaction is our priority
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
