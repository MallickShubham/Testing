'use client'

import './Style/style.css';
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, AlertTriangle, CheckCircle, Power, PowerOff, Users, LineChart, Search, Filter, Download, ChevronRight, Bell, Sun, Moon } from 'lucide-react';

const initialClosedCommissioningData = [
  { id: 'CC001', customerName: 'John Doe', product: 'Solar Panel X1', closedDate: '2023-05-15', resolution: 'Completed', satisfactionLevel: 'High' },
  { id: 'CC002', customerName: 'Jane Smith', product: 'Wind Turbine Y2', closedDate: '2023-05-14', resolution: 'Partially Completed', satisfactionLevel: 'Medium' },
  { id: 'CC003', customerName: 'Bob Johnson', product: 'Hydroelectric Generator Z3', closedDate: '2023-05-13', resolution: 'Completed with Issues', satisfactionLevel: 'Low' },
  { id: 'CC004', customerName: 'Alice Brown', product: 'Geothermal System A4', closedDate: '2023-05-12', resolution: 'Completed', satisfactionLevel: 'High' },
  { id: 'CC005', customerName: 'Charlie Davis', product: 'Biomass Boiler B5', closedDate: '2023-05-11', resolution: 'Partially Completed', satisfactionLevel: 'Medium' },
];

export default function ClosedCommissioning() {
  const [isOpen, setIsOpen] = useState(() => localStorage.getItem('sidebarOpen') === 'true');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [closedCommissioning, setClosedCommissioning] = useState(initialClosedCommissioningData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResolution, setSelectedResolution] = useState('All Resolutions');
  const [showFilters, setShowFilters] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newCommissioning, setNewCommissioning] = useState({
    customerName: '',
    product: '',
    closedDate: '',
    resolution: 'Completed',
    satisfactionLevel: 'Medium',
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

  const toggleFilters = () => setShowFilters((prev) => !prev);
  const toggleNotification = () => setShowNotification((prev) => !prev);
  const toggleSignInPopup = () => setShowSignInPopup((prev) => !prev);
  const toggleForm = () => setShowForm((prev) => !prev);

  const [pdfUrl] = useState('/https://get.adobe.com/reader/');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'https://get.adobe.com/reader/'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCommissioning((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newCommissioning.customerName && newCommissioning.product && newCommissioning.closedDate) {
      const newId = `CC${(closedCommissioning.length + 1).toString().padStart(3, '0')}`;
      const commissioningToAdd = { ...newCommissioning, id: newId };
      setClosedCommissioning([...closedCommissioning, commissioningToAdd]);
      setNewCommissioning({ customerName: '', product: '', closedDate: '', resolution: 'Completed', satisfactionLevel: 'Medium' });
      setShowForm(false);
    } else {
      alert('Please fill all the fields');
    }
  };

  const filteredCommissioning = closedCommissioning.filter((commissioning) =>
    commissioning.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedResolution === 'All Resolutions' || commissioning.resolution === selectedResolution)
  );

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
            <h1>Closed Commissioning</h1>
            <div className="breadcrumb">
              Dashboard <ChevronRight className="icon ChevronRight" size={15} /> Closed Commissioning
            </div>
          </div>

          <div className="table-actions">
            <div className="search-and-filter">
              <div className="search-bar">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search commissioning..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="category-select">
                <select
                  value={selectedResolution}
                  onChange={(e) => setSelectedResolution(e.target.value)}
                >
                  <option>All Resolutions</option>
                  <option>Completed</option>
                  <option>Partially Completed</option>
                  <option>Completed with Issues</option>
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
              <button className="primary-button" onClick={toggleForm}>Add Closed Commissioning</button>
            </div>
          </div>

          {/* Form for Adding Closed Commissioning */}
          {showForm && (
            <form className="add-product-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <input
                  type="text"
                  name="customerName"
                  placeholder="Customer Name"
                  value={newCommissioning.customerName}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="product"
                  placeholder="Product"
                  value={newCommissioning.product}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="date"
                  name="closedDate"
                  placeholder="Closed Date"
                  value={newCommissioning.closedDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <select
                  name="resolution"
                  value={newCommissioning.resolution}
                  onChange={handleInputChange}
                >
                  <option value="Completed">Completed</option>
                  <option value="Partially Completed">Partially Completed</option>
                  <option value="Completed with Issues">Completed with Issues</option>
                </select>
                <select
                  name="satisfactionLevel"
                  value={newCommissioning.satisfactionLevel}
                  onChange={handleInputChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <button type="submit" className="primary-button">
                Submit
              </button>
            </form>
          )}

          {/* Closed Commissioning Table */}
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Commissioning ID</th>
                  <th>Customer Name</th>
                  <th>Product</th>
                  <th>Closed Date</th>
                  <th>Resolution</th>
                  <th>Satisfaction Level</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCommissioning.map((commissioning) => (
                  <tr key={commissioning.id}>
                    <td>{commissioning.id}</td>
                    <td>{commissioning.customerName}</td>
                    <td>{commissioning.product}</td>
                    <td>{commissioning.closedDate}</td>
                    <td>
                      <span className={`resolution-badge ${commissioning.resolution.toLowerCase().replace(' ', '-')}`}>
                        {commissioning.resolution}
                      </span>
                    </td>
                    <td>
                      <span className={`satisfaction-badge ${commissioning.satisfactionLevel.toLowerCase()}`}>
                        {commissioning.satisfactionLevel}
                      </span>
                    </td>
                    <td>
                      <button className="edit-button">View Details</button>
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