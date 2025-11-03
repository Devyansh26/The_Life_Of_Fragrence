import axios from 'axios'

const API_BASE_URL ='https://the-life-of-fragrence.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ==================== AUTH ====================

export const login = (username, password) => {
  return api.post('/login', { username, password })
}

export const verifyToken = () => {
  return api.get('/verify')
}

// ==================== PRODUCTS ====================

// Get all products (for public/manage view)
export const getProducts = (params) => {
  return api.get('/manage', { params })
}

// Get single product by ID (if you have this endpoint in backend)
export const getProductById = (id) => {
  return api.get(`/products/${id}`)
}

// Upload new product with images
export const uploadProduct = (productData, files) => {
  const formData = new FormData()
  
  // Add form fields exactly as backend expects
  formData.append('name', productData.name)
  formData.append('category', productData.category)
  formData.append('price', productData.price)
  formData.append('description', productData.description)
  formData.append('badge', productData.badge || '')
  formData.append('inStock', productData.inStock)
  formData.append('featured', productData.featured)
  formData.append('specifications', JSON.stringify(productData.specifications || {}))
  
  // Add files
  files.forEach(file => {
    formData.append('files', file)
  })
  
  // Debug - log what we're sending
  console.log('Sending product data:')
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1])
  }
  
  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// Update product (if you have this endpoint)
export const updateProduct = (id, productData, files) => {
  const formData = new FormData()
  
  // Only append fields that are provided
  if (productData.name !== undefined) formData.append('name', productData.name)
  if (productData.category !== undefined) formData.append('category', productData.category)
  if (productData.price !== undefined) formData.append('price', productData.price)
  if (productData.description !== undefined) formData.append('description', productData.description)
  if (productData.badge !== undefined) formData.append('badge', productData.badge || '')
  if (productData.inStock !== undefined) formData.append('inStock', productData.inStock)
  if (productData.featured !== undefined) formData.append('featured', productData.featured)
  if (productData.specifications !== undefined) {
    formData.append('specifications', JSON.stringify(productData.specifications || {}))
  }
  
  // Add new files if provided
  if (files && files.length > 0) {
    files.forEach(file => {
      formData.append('files', file)
    })
  }
  
  return api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

// Delete product
export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`)
}


// Create product (alias for uploadProduct for compatibility)
export const createProduct = uploadProduct

export default api
