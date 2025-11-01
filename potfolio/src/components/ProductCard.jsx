import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Handle both single image and array of images
  const images = product.images || [product.image]
  const hasMultipleImages = images.length > 1

  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Link to={`/products/${product.id || product._id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-amber-700 text-white text-xs px-3 py-1 rounded-full z-10">
            {product.badge}
          </span>
        )}

        {/* Image with Carousel */}
        <div className="relative aspect-square overflow-hidden group/image">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Arrow Navigation - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              {/* Previous Button */}
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-1.5 shadow-md opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-800 rounded-full p-1.5 shadow-md opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                aria-label="Next image"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      currentImageIndex === index 
                        ? 'bg-white w-4' 
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="font-medium text-neutral-800 mb-1">{product.name}</h3>
          <p className="text-sm text-neutral-500 mb-2 capitalize">{product.category}</p>
          <p className="text-amber-700 font-medium">₹{product.price}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
