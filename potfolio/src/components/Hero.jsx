import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-stone-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left px-4 md:px-0">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-medium tracking-wide">
                Handcrafted Excellence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light leading-tight mb-6 text-neutral-900">
              The Life of
              <span className="block text-amber-700 mt-2">Fragrance</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Home of timeless, sustainable & eco-conscious candles and perfumes that transform everyday moments into extraordinary experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary inline-block px-8 py-4 text-lg">
                Shop Now
              </Link>
              <Link to="/about" className="btn-secondary inline-block px-8 py-4 text-lg">
                Our Story
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 w-full px-4 md:px-0">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <img
                  src="https://res.cloudinary.com/dywumnmsa/image/upload/v1762030668/tlof/products/nalojikhffn6eghvonln.jpg"
                  alt="Luxury Candle"
                  className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                />
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-neutral-600 font-medium">100% Natural</p>
                  <p className="text-2xl font-light text-neutral-900 mt-1">Soy Wax</p>
                </div>
              </div>
              <div className="mt-12 space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <p className="text-sm text-neutral-600 font-medium">Hand-Poured</p>
                  <p className="text-2xl font-light text-neutral-900 mt-1">With Love</p>
                </div>
                <img
                  src="https://res.cloudinary.com/dywumnmsa/image/upload/v1762030705/tlof/products/qjhc82cbfh1vtmzwxqu0.webp"
                  alt="Artisan Candle"
                  className="rounded-2xl shadow-2xl w-full h-64 sm:h-80 object-cover transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero