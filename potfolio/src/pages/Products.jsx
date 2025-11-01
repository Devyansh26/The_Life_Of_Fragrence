import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../../services/api'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      // Try to get from localStorage first
      const cached = localStorage.getItem('products')
      if (cached) {
        setProducts(JSON.parse(cached))
        setLoading(false)
        return
      }

      // If not in cache, fetch from API
      const response = await getProducts()
      setProducts(response.data)
      
      // Store in localStorage
      localStorage.setItem('products', JSON.stringify(response.data))
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter products by category
  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true
    return product.category.toLowerCase() === filter.toLowerCase()
  })

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-4xl sm:text-5xl font-light text-center mb-8">Our Products</h1>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Discover our collection of handcrafted candles and perfumes, 
          each made with love and natural ingredients.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['all', 'candle', 'perfumes'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition ${
                filter === category
                  ? 'bg-amber-700 text-white'
                  : 'bg-white text-neutral-800 hover:bg-stone-100'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto mb-4"></div>
              <p className="text-neutral-600">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-2">No products found in this category.</p>
            <p className="text-sm text-neutral-500">Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
