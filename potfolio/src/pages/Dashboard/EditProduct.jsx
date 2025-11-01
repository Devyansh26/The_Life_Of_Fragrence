import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProducts, updateProduct } from '../../../services/api'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: 'candles',
    price: '',
    description: '',
    badge: '',
    inStock: true,
    featured: false,
    specifications: {}
  })

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      // Get all products and find the one we need
      const response = await getProducts()
      const product = response.data.find(p => p.id === parseInt(id))
      
      if (!product) {
        alert('Product not found')
        navigate('/dashboard/manage-products')
        return
      }

      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        badge: product.badge || '',
        inStock: product.inStock,
        featured: product.featured,
        specifications: product.specifications || {}
      })

      // Set existing images as previews
      setPreviewUrls(product.images || [])
    } catch (error) {
      console.error('Error fetching product:', error)
      alert('Error loading product')
    } finally {
      setFetchLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
    
    // Create preview URLs for new files
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const handleSpecificationChange = (key, value) => {
    setFormData({
      ...formData,
      specifications: {
        ...formData.specifications,
        [key]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    try {
      const cleanedSpecs = Object.fromEntries(
        Object.entries(formData.specifications).filter(([_, value]) => value !== '')
      )

      const productData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        badge: formData.badge,
        inStock: formData.inStock,
        featured: formData.featured,
        specifications: cleanedSpecs,
      }

      await updateProduct(id, productData, selectedFiles)
      alert('Product updated successfully!')
      navigate('/dashboard/manage-products')
    } catch (error) {
      console.error('Error:', error)
      const errorMsg = error.response?.data?.detail || error.message || 'Error updating product'
      alert(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    )
  }

  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-light mb-8">Edit Product</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
            >
              <option value="candles">Candles</option>
              <option value="perfumes">Perfumes</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">Price (₹) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows="4"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
              required
            />
          </div>

          {/* Current Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Current Images</label>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img src={url} alt={`Current ${index + 1}`} className="w-full h-24 object-cover rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Upload New Images (Optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg"
            />
            <p className="text-xs text-neutral-500 mt-1">Upload new images to replace existing ones</p>
          </div>

          {/* Badge */}
          <div>
            <label className="block text-sm font-medium mb-2">Badge (Optional)</label>
            <input
              type="text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              placeholder="e.g., Best Seller, New Arrival"
              className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
            />
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-sm font-medium mb-3">Specifications</label>
            <div className="space-y-3">
              {Object.entries(formData.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={key}
                    readOnly
                    className="px-4 py-2 border border-stone-300 rounded-lg bg-stone-50"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-700 focus:border-transparent outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="mr-2 w-4 h-4 cursor-pointer"
              />
              <span className="text-sm">In Stock</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2 w-4 h-4 cursor-pointer"
              />
              <span className="text-sm">Featured Product</span>
            </label>
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard/manage-products')}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
