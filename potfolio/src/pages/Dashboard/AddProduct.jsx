import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadProduct } from '../../../services/api'

const AddProduct = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
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
    specifications: {
      'Weight': '',
      'Burn Time': '',
      'Fragrance': '',
    }
  })

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    setSelectedFiles(files)
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
  }

  const removeImage = (index) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index)
    const newUrls = previewUrls.filter((_, i) => i !== index)
    setSelectedFiles(newFiles)
    setPreviewUrls(newUrls)
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
  
  if (selectedFiles.length === 0) {
    alert('Please select at least one image')
    return
  }

  setLoading(true)
  try {
    const cleanedSpecs = Object.fromEntries(
      Object.entries(formData.specifications).filter(([_, value]) => value !== '')
    )

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      specifications: cleanedSpecs,
    }

    await uploadProduct(productData, selectedFiles)
    
    // Clear localStorage cache so it fetches fresh data
    localStorage.removeItem('products')
    
    alert('Product added successfully!')
    navigate('/dashboard/manage-products')
  } catch (error) {
    console.error('Error:', error)
    const errorMsg = error.response?.data?.detail || error.message || 'Error adding product'
    alert(errorMsg)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom max-w-3xl">
        <h1 className="text-4xl font-light mb-8">Add New Product</h1>

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

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Product Images *</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-stone-300 rounded-lg"
            />
            <p className="text-xs text-neutral-500 mt-1">Upload multiple images. First image will be the main image.</p>
            
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
            <label className="block text-sm font-medium mb-3">Specifications (Optional)</label>
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
                    placeholder={`Enter ${key.toLowerCase()}`}
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
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Product...
                </span>
              ) : (
                'Add Product'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
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

export default AddProduct
