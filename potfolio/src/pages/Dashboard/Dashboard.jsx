import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="section-padding bg-stone-50 min-h-screen">
      <div className="container-custom">
        <h1 className="text-4xl font-light mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            to="/dashboard/add-product"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="text-amber-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Add Product</h3>
            <p className="text-neutral-600 text-sm">Create a new product listing</p>
          </Link>

          <Link
            to="/dashboard/manage-products"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="text-amber-700 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">Manage Products</h3>
            <p className="text-neutral-600 text-sm">Edit or delete existing products</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
