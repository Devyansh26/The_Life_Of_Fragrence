import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductGallery from '../components/ProductGallery'
import { getProducts } from '../../services/api'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      // Try localStorage first
      const cached = localStorage.getItem('products')
      let products = []

      if (cached) {
        products = JSON.parse(cached)
      } else {
        // Fetch if not cached
        const response = await getProducts()
        products = response.data
        localStorage.setItem('products', JSON.stringify(products))
      }

      // Find the product
      const foundProduct = products.find(p => p.id === parseInt(id))
      setProduct(foundProduct)
    } catch (error) {
      console.error('Error loading product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsAppOrder = () => {
    if (!product) return
    
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering:\n\n${product.name}\nPrice: ₹${product.price}\n\nPlease provide more details.`
    )
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Product not found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-white">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-neutral-600">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-amber-700">Products</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <ProductGallery images={product.images || [product.image]} />
          </div>

          {/* Product Info */}
          <div>
            {product.badge && (
              <span className="inline-block bg-amber-700 text-white text-xs px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}
            
            <h1 className="text-3xl sm:text-4xl font-light mb-2">{product.name}</h1>
            <p className="text-neutral-500 mb-4 capitalize">{product.category}</p>
            <p className="text-2xl text-amber-700 font-medium mb-6">₹{product.price}</p>

            <div className="prose prose-sm mb-8">
              <p className="text-neutral-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <h3 className="font-medium mb-3">Specifications</h3>
                <ul className="space-y-2 text-sm text-neutral-600">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key} className="flex">
                      <span className="font-medium w-32">{key}:</span>
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppOrder}
                disabled={!product.inStock}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Order via WhatsApp
              </button>
              <Link to="/products" className="block w-full text-center btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
