import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import './index.css'

const ProductCard = ({ product }) => {
  const [liked, setLiked] = useState(false)

  const isOutOfStock = product.stock === 0
  const isNew = product.isNew // boolean

  return (
    <div className="product-card">
      {/* Wishlist */}
      <span
        className="wishlist"
        onClick={() => setLiked(!liked)}
        title={liked ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
      
      </span>

      {/* New Product Ribbon */}
      {isNew && <div className="ribbon">NEW PRODUCT</div>}

      {/* Product Image */}
      <div className="image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        {isOutOfStock && <div className="out-of-stock">OUT OF STOCK</div>}
      </div>

      {/* Product Title */}
      <h4 className="product-title">
        {product.title.length > 30
          ? product.title.slice(0, 30) + '…'
          : product.title}
      </h4>

      {/* Sign-in and Price Info */}
      <div className='signin-text-icon-card'>
        <p className="signin-text">
          <a href="/login">Sign in</a> or Create an account to see pricing
        </p>
        <FaHeart color={liked ? '#e63946' : '#aaa'} />
      </div>
      
      
    </div>
  )
}

export default ProductCard
