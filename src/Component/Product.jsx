'use client'

import './Style/style.css';
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, AlertTriangle, CheckCircle, Power, PowerOff, Users, LineChart, Search, Filter, Download, ChevronRight, Bell, Sun, Moon } from 'lucide-react';

const initialProductsData = [
  { id: 1, name: "Laptop Pro", category: "Electronics", price: "$1299.99", stock: 50, status: "In Stock" },
  { id: 2, name: "Comfort Chair", category: "Furniture", price: "$199.99", stock: 100, status: "In Stock" },
  { id: 3, name: "Smart Watch", category: "Electronics", price: "$249.99", stock: 25, status: "Low Stock" },
  { id: 4, name: "Wireless Earbuds", category: "Electronics", price: "$79.99", stock: 0, status: "Out of Stock" },
  { id: 5, name: "Coffee Maker", category: "Appliances", price: "$89.99", stock: 75, status: "In Stock" },
];

export default function Product() {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('sidebarOpen') === 'true');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [products, setProducts] = useState(initialProductsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'In Stock',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [editProductId, setEditProductId] = useState(null); 

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', isOpen);
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(prevIsOpen => {
      const newIsOpen = !prevIsOpen;
      localStorage.setItem('sidebarOpen', newIsOpen);
      return newIsOpen;
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(prevDarkMode => {
      const newDarkMode = !prevDarkMode;
      localStorage.setItem('darkMode', newDarkMode); 
      document.body.classList.toggle('dark-mode', newDarkMode);
      return newDarkMode;
    });
  };

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      const newId = products.length + 1;
      const productToAdd = { ...newProduct, id: newId };
      setProducts([...products, productToAdd]);
      setNewProduct({ name: '', category: '', price: '', stock: '', status: 'In Stock' });
      setShowForm(false);
    } else {
      alert('Please fill all the fields');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All Categories' || product.category === selectedCategory)
  );

  const toggleFilters = () => setShowFilters((prev) => !prev);
  const toggleNotification = () => setShowNotification((prev) => !prev);
  const toggleSignInPopup = () => setShowSignInPopup((prev) => !prev);
// DOWNLOAD //

 
  const [pdfUrl] = useState('/https://get.adobe.com/reader/');

  
  const handleDownload = () => {
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'https://get.adobe.com/reader/'; 
    link.click();
    document.body.removeChild(link);
  };

  // HANDLECLICKEDIT FORM //

  const handleFormSubmitt = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      if (editProductId !== null) {
        // Update existing product
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editProductId ? { ...product, ...newProduct } : product
          )
        );
        setEditProductId(null);
      } else {
        // Add new product
        const newId = products.length + 1;
        const productToAdd = { ...newProduct, id: newId };
        setProducts([...products, productToAdd]);
      }

      setNewProduct({ name: '', category: '', price: '', stock: '', status: 'In Stock' });
      setShowForm(false);
    } else {
      alert('Please fill all the fields');
    }
  };
  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
    });
    setShowForm(true);
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''} ${darkMode ? 'dark' : ''}`}>
        <div className="logo">
          <img src="/assets/logo.png" alt="" className={`logo-image ${isOpen ? 'open' : ''}`} />
          {isOpen && <span className="logo-text"></span>}
        </div>
        <nav className="menu">
          <a href="/dashboard"><LayoutDashboard size={25} className="icon" />{isOpen && <span>Dashboard</span>}</a>
          <a href="/Product"><Package size={25} className="icon" />{isOpen && <span>Products</span>}</a>
          <a href="/Active Complaints"><AlertTriangle size={25} className="icon" />{isOpen && <span>Active Complaints</span>}</a>
          <a href="/Closed Complaints"><CheckCircle size={25} className="icon" />{isOpen && <span>Closed Complaints</span>}</a>
          <a href="/Anylatics"><LineChart size={25} className="icon" />{isOpen && <span>Anylatics</span>}</a>
          <a href="/Active Commissioning"><Power size={25} className="icon" />{isOpen && <span>Active Commissioning</span>}</a>
          <a href="/Closed Commissioning"><PowerOff size={25} className="icon" />{isOpen && <span>Closed Commissioning</span>}</a>
          <a href="/Customers"><Users size={25} className="icon" />{isOpen && <span>Customers</span>}</a>
        </nav>
      </div>

      {/* Top Navbar */}
      <div className={`navbar ${darkMode ? 'dark' : ''} ${isOpen ? 'shifted' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>☰</button>
        <div className="search-bar">
          <Search size={20} className="icon" />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="nav-icons">
          <Bell size={20} className="icon" onClick={toggleNotification} />
          {showNotification && (
            <div className="notification-popup">
              <div className="popup-content">
                <p><Bell size={16} className="icon"/>You have new notifications 1</p>
                <p><Bell size={16} className="icon"/>You have new notifications 2</p>
                <p><Bell size={16} className="icon"/>You have new notifications 3</p>
                <p><Bell size={16} className="icon"/>You have new notifications 4</p>
              </div>
            </div>
          )}
          <img
            src="path/to/profile.jpg"
            alt="Profile"
            className="icon profile-image"
            onClick={toggleSignInPopup}
          />
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Sign-In Popup */}
      {showSignInPopup && (
        <div className="popup">
          <div className="popup-content">
            <p className="popup-stayle">Sign In</p>
            <button onClick={() => setShowSignInPopup(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main>
        <div className={`main-content ${isOpen ? 'shifted' : ''} ${darkMode ? 'dark' : ''}`}>
          <div className="header">
            <h1>Products</h1>
            <div className="breadcrumb">
              Dashboard <ChevronRight className="icon ChevronRight" size={15} /> Product
            </div>
          </div>

          <div className="table-actions">
            <div className="search-and-filter">
              <div className="search-bar">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="category-select">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Appliances</option>
                </select>
              </div>
            </div>
            <div className="filter-container filter-move">
              {showFilters && (
                <div className="filter-options">
                  <div className="filter-item">
                    <label>Region:</label>
                    <select>
                      <option value="">Select Region</option>
                      <option value="north">North</option>
                      <option value="south">South</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>Territory:</label>
                    <select>
                      <option value="">Select Territory</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                    </select>
                  </div>
                  <div className="filter-item">
                    <label>All User Type:</label>
                    <select>
                      <option value="">Select User Type</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                    </select>
                  </div>
                  <div className="filter-row">
                    <div className="filter-item">
                      <label>Product:</label>
                      <select>
                        <option value="">Select Product</option>
                        <option value="product1">Product 1</option>
                        <option value="product2">Product 2</option>
                      </select>
                    </div>
                    <div className="filter-item">
                      <label>From Date:</label>
                      <input type="date" />
                    </div>
                    <div className="filter-item">
                      <label>To Date:</label>
                      <input type="date" />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="action-buttons">
              <button className="icon-button" onClick={toggleFilters}><Filter /></button>
              <button className="icon-button" onClick={handleDownload}><Download /></button>
              <button className="primary-button" onClick={toggleForm}>Add Product</button>
            </div>
          </div>

          {/* Form for Adding Product */}
          {showForm && (
            <form className="add-product-form" onSubmit={handleFormSubmitt}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleInputChange}
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <button type="submit" className="primary-button">
                Submit
              </button>
            </form>
          )}

          {/* Form for Adding or Editing Product */}
          
          {/* Product Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`status-badge ${product.status.toLowerCase().replace(' ', '-')}`}>
                        {product.status}
                      </span>
                    </td>
                    <td>
                    <button className="edit-button" onClick={() => handleEditClick(product)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}