import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>  welcome to our store🛍️</h1>

      <p className="subtitle">
        The best products with the highest quality and competitive prices
      </p>

      <div className="features">
        <div className="feature">
          <h3>🚚 fast delivery</h3>
          <p>We will deliver your order to your doorstep as quickly as possible.</p>
        </div>

        <div className="feature">
          <h3>💳 secure payment</h3>
          <p> multiple & secure payment methods %100</p>
        </div>

        <div className="feature">
          <h3>⭐ featured products</h3>
          <p> We carefully select the best products for you</p>
        </div>
      </div>
      <Link to="/Product">

      <button className="shop-btn">
        shop now
      </button>
      </Link>
    </div>
  )
}

export default Home
