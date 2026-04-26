import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="card text-center footer-card">
        <div className="card-header">
          <ul className="nav nav-pills card-header-pills justify-content-center">
            <li className="nav-item">
              <a className="nav-link active" href="./">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="./about">About</a>
            </li>
            <li className="nav-item">
             <a className="nav-link" href="./product ">Product </a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <h5 className="card-title">My Web Site</h5>
          <p className="card-text">
            © 2026 All rights reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
