import React from 'react'

const About = () => {
  return (
    <div className="section-padding bg-white">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-light text-center mb-8">About Us</h1>
        
        <div className="mb-12">
          <img
            src="https://res.cloudinary.com/dywumnmsa/image/upload/v1762030784/tlof/products/dsnvvq5wqx1ab9jqp1k6.jpg"
            alt="About The Life of Fragrance"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-light mb-4">Our Story</h2>
          <p className="text-neutral-600 mb-6">
            The Life of Fragrance began with a simple belief: that everyday moments 
            deserve to be extraordinary. What started as a passion for creating 
            beautiful scents in a small home studio has blossomed into a celebration 
            of handcrafted excellence.
          </p>

          <h2 className="text-2xl font-light mb-4">Our Craft</h2>
          <p className="text-neutral-600 mb-6">
            Each candle and perfume is meticulously handcrafted using only the finest 
            natural ingredients. We believe in the power of quality over quantity, 
            ensuring that every product that leaves our studio meets our exacting 
            standards for fragrance, burn time, and aesthetic beauty.
          </p>

          <h2 className="text-2xl font-light mb-4">Sustainability</h2>
          <p className="text-neutral-600 mb-6">
            We're committed to creating products that are as kind to the planet as 
            they are to your senses. From our eco-friendly packaging to our sustainably 
            sourced ingredients, every decision we make considers our environmental impact.
          </p>

          <h2 className="text-2xl font-light mb-4">Our Promise</h2>
          <p className="text-neutral-600">
            When you choose The Life of Fragrance, you're not just buying a candle or 
            perfume – you're investing in moments of tranquility, luxury, and 
            self-care. We promise to continue crafting products that transform your 
            space and uplift your spirit.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
