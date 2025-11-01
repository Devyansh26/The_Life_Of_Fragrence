import React from 'react'
import Hero from '../components/Hero'
import Testimonials from '../components/Testimonials'
import { Link } from 'react-router-dom'

const Home = () => {
  // Hardcoded featured products gallery
  const featuredGallery = [
              'https://res.cloudinary.com/dywumnmsa/image/upload/v1762030784/tlof/products/dsnvvq5wqx1ab9jqp1k6.jpg',
              "https://res.cloudinary.com/dywumnmsa/image/upload/v1762031062/tlof/products/lwpsci0i9htzv51i26uk.jpg",
              "https://res.cloudinary.com/dywumnmsa/image/upload/v1762031109/tlof/products/an7x1wftg5txymcfigy0.jpg",
              'https://res.cloudinary.com/dywumnmsa/image/upload/v1762030901/tlof/products/ydfjnysa1j0leryjmsm5.webp',
            ]

  return (
    <div>
      <Hero />

      {/* Featured Products Gallery - Hardcoded */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl sm:text-4xl font-light text-center mb-12">Your New Faves</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredGallery.map((img, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group">
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={img}
                    alt={`Featured ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-stone-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://res.cloudinary.com/dywumnmsa/image/upload/v1762030784/tlof/products/dsnvvq5wqx1ab9jqp1k6.jpg"
                alt="Luxury Candles"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-light mb-4">Luxury Candles</h2>
              <p className="text-neutral-600 mb-4">
                At The Life of Fragrance, we're on a mission to bring everyday 
                moments into something special. We do so with our unique, 
                handcrafted candles and perfumes that are not just products, but 
                experiences.
              </p>
              <p className="text-neutral-600 mb-6">
                Each candle is carefully crafted with natural ingredients, 
                offering the perfect balance of luxury and sustainability, 
                transforming life through the art of scent.
              </p>
              <Link to="/about" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      

      {/* Newsletter/CTA Section - Split Layout */}
<section className="section-padding bg-white">
  <div className="container-custom">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-amber-50 to-stone-100 rounded-2xl overflow-hidden">
      {/* Image Side */}
      <div className="h-full min-h-[300px] lg:min-h-[400px]">
        <img
          src="https://res.cloudinary.com/dywumnmsa/image/upload/v1762030956/tlof/products/srh96k6zzjkofpymstx2.webp"
          alt="Stay Connected"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Side */}
      <div className="p-8 lg:p-12">
        <h2 className="text-3xl sm:text-4xl font-light mb-4">Stay Connected</h2>
        <p className="text-neutral-600 mb-8">
          Join our community to receive exclusive offers, new product launches, and fragrance tips.
        </p>
        
        <div className="flex flex-col gap-4">
          <Link 
            to="/products" 
            className="btn-primary text-center"
          >
            Shop Now
          </Link>
          <Link 
            to="/contact" 
            className="btn-secondary text-center"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>



    </div>
  )
}

export default Home
