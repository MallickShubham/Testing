'use client'

import './Style/style.css';
import { LayoutDashboard, Package, AlertTriangle, CheckCircle, Power, PowerOff, Users, UserCheck, Bell, Sun, Moon, Search, Download, ChevronRight, Filter, ChevronDown, LineChart, Upload } from 'lucide-react';
import { BsCalendarCheck, BsPeople, BsCurrencyDollar } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';

const initialCustomers = [
  { id: 1, name: "John Doe", product: "Laptop Pro", purchaseDate: "2023-05-15", totalPurchases: 3, status: "Active" },
  { id: 2, name: "Jane Smith", product: "Smart Watch", purchaseDate: "2023-05-14", totalPurchases: 1, status: "New" },
  { id: 3, name: "Bob Johnson", product: "Wireless Earbuds", purchaseDate: "2023-05-13", totalPurchases: 2, status: "Active" },
  { id: 4, name: "Alice Brown", product: "Coffee Maker", purchaseDate: "2023-05-12", totalPurchases: 1, status: "Inactive" },
  { id: 5, name: "Charlie Davis", product: "Smartphone", purchaseDate: "2023-05-11", totalPurchases: 4, status: "Active" },
  { id: 6, name: "Eva Wilson", product: "Tablet", purchaseDate: "2023-05-10", totalPurchases: 2, status: "Active" },
  { id: 7, name: "Frank Miller", product: "Smart TV", purchaseDate: "2023-05-09", totalPurchases: 1, status: "New" },
  { id: 8, name: "Grace Lee", product: "Fitness Tracker", purchaseDate: "2023-05-08", totalPurchases: 3, status: "Active" },
]
  
export default function Customer() {
  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('sidebarOpen') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    product: '',
    purchaseDate: '',
    totalPurchases: 0,
    status: 'New',
    profilePhoto: null
  });

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

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const toggleSignInPopup = () => {
    setShowSignInPopup(prevShowSignInPopup => !prevShowSignInPopup);
  };

  const [pdfUrl] = useState('/https://get.adobe.com/reader/');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'https://get.adobe.com/reader/';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredCustomers = customers.filter(customer => 
    (customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     customer.product.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedStatus === 'All Statuses' || customer.status === selectedStatus)
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewCustomer(prev => ({
      ...prev,
      profilePhoto: e.target.files[0]
    }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newId = customers.length + 1;
    const customerToAdd = { ...newCustomer, id: newId };
    setCustomers([...customers, customerToAdd]);
    setNewCustomer({
      name: '',
      product: '',
      purchaseDate: '',
      totalPurchases: 0,
      status: 'New',
      profilePhoto: null
    });
    setShowAddCustomerForm(false);
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
          <a href="/dashboard">
            <LayoutDashboard size={25} className="icon" />
            {isOpen && <span>Dashboard</span>}
          </a>
          <a href="/Product">
            <Package size={25} className="icon" />
            {isOpen && <span>Products</span>}
          </a>
          <a href="/Active Complaints">
            <AlertTriangle size={25} className="icon" />
            {isOpen && <span>Active Complaints</span>}
          </a>
          <a href="/Closed Complaints">
            <CheckCircle size={25} className="icon" />
            {isOpen && <span>Closed Complaints</span>}
          </a>
          <a href="/Anylatics">
            <LineChart size={25} className="icon" />
            {isOpen && <span>Anylatics</span>}
          </a>
          <a href="/Active Commissioning">
            <Power size={25} className="icon" />
            {isOpen && <span>Active Commissioning</span>}
          </a>
          <a href="/Closed Commissioning">
            <PowerOff size={25} className="icon" />
            {isOpen && <span>Closed Commissioning</span>}
          </a>
          <a href="/Customers">
            <Users size={25} className="icon" />
            {isOpen && <span>Customers</span>}
          </a>
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
            <h1>Customer</h1>
            <div className="breadcrumb">
              Dashboard <ChevronRight className="icon ChevronRight" size={15} /> Customer
            </div>
          </div>

          <div className="table-actions">
            <div className="search-and-filter">
              <div className="search-bar">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search Customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="category-select">
                <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>New</option>
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
              <button className="primary-button" onClick={() => setShowAddCustomerForm(true)}>Add Customer</button>
            </div>
          </div>

          {/* Add Customer Form */}
          {showAddCustomerForm && (
            <form className="add-product-form" onSubmit={handleAddCustomer}>
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Customer Name"
                  value={newCustomer.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="product"
                  placeholder="Product"
                  value={newCustomer.product}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="purchaseDate"
                  placeholder="Purchase Date"
                  value={newCustomer.purchaseDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <input
                  type="number"
                  name="totalPurchases"
                  placeholder="Total Purchases"
                  value={newCustomer.totalPurchases}
                  onChange={handleInputChange}
                  required
                />
                <select
                  name="status"
                  value={newCustomer.status}
                  onChange={handleInputChange}
                >
                  <option value="New">New</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="form-row">
                <label htmlFor="profilePhoto" className="file-upload-label">
                  <Upload size={20} />
                  <span>Upload Profile Photo</span>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                </label>
                {newCustomer.profilePhoto && (
                  <span className="file-name">{newCustomer.profilePhoto.name}</span>
                )}
              </div>
              <button type="submit" className="primary-button">
                Submit
              </button>
            </form>
          )}

          <div className="customer-grid">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="avatar-container">
                  <img src="/placeholder.svg?height=60&width=60" alt="Customer avatar" className="avatar" />
                </div>
                <h2 className="customer-name">{customer.name}</h2>
                <p className="customer-product">{customer.product}</p>
                <p className="customer-info">Purchase Date: {customer.purchaseDate}</p>
                <p className="customer-info">Total Purchases: {customer.totalPurchases}</p>
                <p className={`customer-status ${customer.status.toLowerCase()}`}>{customer.status}</p>
                <button className="edit-button">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}