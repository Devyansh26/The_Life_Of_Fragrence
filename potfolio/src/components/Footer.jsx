import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-light mb-3">The Life of Fragrance</h3>
            <p className="text-neutral-600 text-sm max-w-md">
              Handcrafted candles and perfumes made with love and care. 
              Experience the perfect blend of luxury and sustainability.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-neutral-600">
              <li><Link to="/products" className="hover:text-amber-700">Shop</Link></li>
              <li><Link to="/about" className="hover:text-amber-700">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-amber-700">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-3">Contact Us</h4>
            <p className="text-sm text-neutral-600">
              Have questions?<br />
              Reach out via WhatsApp
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-stone-200 text-center text-sm text-neutral-600">
          <p>&copy; {new Date().getFullYear()} The Life of Fragrance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
