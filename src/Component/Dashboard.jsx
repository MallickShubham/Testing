import './Style/style.css';
import { LayoutDashboard, Package, AlertTriangle, CheckCircle, Power, PowerOff, Users,  Bell, Sun, Moon, Search, Download, ChevronRight, Filter, Plus,LineChart } from 'lucide-react';
import { BsCalendarCheck, BsPeople, BsCurrencyDollar } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';



  function Dashboard() {

  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('sidebarOpen') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const [activePage, setActivePage] = useState("");  // Track the active page
  const [showAddOrderForm, setShowAddOrderForm] = useState(false);
  const [recentOrders, setRecentOrders] = useState([
    { user: 'Shubham Mallick', date: '20-9-2024', status: 'Completed' },
    { user: 'Shubham Mallick', date: '21-9-2024', status: 'Pending' },
  ]);
  const [newOrder, setNewOrder] = useState({ user: '', date: '', status: '' });

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

  const handleNewOrderChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    if (newOrder.user && newOrder.date && newOrder.status) {
      setRecentOrders((prevOrders) => [...prevOrders, newOrder]);
      setShowAddOrderForm(false);
      setNewOrder({ user: '', date: '', status: '' });
    }
  };

  const todoItems = ["Todo List", "Todo List", "Todo List", "Todo List"];

  const [pdfUrl] = useState('/https://get.adobe.com/reader/');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'https://get.adobe.com/reader/';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [showSignInPopup, setShowSignInPopup] = useState(false);
  const toggleSignInPopup = () => setShowSignInPopup(prevShowSignInPopup => !prevShowSignInPopup);

  const [showNotification, setShowNotification] = useState(false);
  const toggleNotification = () => setShowNotification(!showNotification);

  

  
  // Set the active menu item
  const handleMenuClick = (page) => {
    setActivePage(page);
  };
  // FILTER COMPONENT //

  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

    // TODOS LIST //


    const [todos, setTodos] = useState([{ id: 1, text: 'Sample To-Do' }]);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [showTodosList, setShowTodosList] = useState(false);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos((prevTodos) => [...prevTodos, { id: prevTodos.length + 1, text: newTodo }]);
      setNewTodo('');
      setShowTodoForm(false); // Close the form after adding
    }
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
          <a
            href="/dashboard"
            onClick={() => handleMenuClick('dashboard')}
            className={activePage === 'dashboard' ? 'active' : ''}
          >
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

              {/* Add more notification details here */}
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
            <h1>Dashboard</h1>
            <div className="breadcrumb">
              Dashboard <ChevronRight className="icon ChevronRight" size={15} /> Home
              <button className="download-btn" onClick={handleDownload}>
                <Download className="icon" size={20} /> Download PDF
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className="Dashboard-charts">
            <ul>
              <li>
                <BsCalendarCheck className="icon charts-icon" size={30} />
                <span className="text">
                  <h3>1020</h3>
                  <p>New Order</p>
                </span>
              </li>
              <li>
                <BsPeople className="icon charts-icon" size={30} />
                <span className="text">
                  <h3>2834</h3>
                  <p>Visitors</p>
                </span>
              </li>
              <li>
                <BsCurrencyDollar className="icon charts-icon" size={30} />
                <span className="text">
                  <h3>$2543</h3>
                  <p>Total Sales</p>
                </span>
              </li>
            </ul>
          </div>

          {/* Table Data and To-Do List */}
          <div className="table-data">
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <Search className="icon data-icon" size={20} />
                <Filter className="icon" size={20} onClick={toggleFilters} />
                <Plus className="icon data-icon" size={20} onClick={() => setShowAddOrderForm(true)} />
                
                {/* Form for Adding Active Commissioning */}
                {showAddOrderForm && (
                <form className="add-product-form" onSubmit={handleAddOrder}>
                  <input
                    type="text"
                    name="user"
                    placeholder="User Name"
                    value={newOrder.user}
                    onChange={handleNewOrderChange}
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={newOrder.date}
                    onChange={handleNewOrderChange}
                    required
                  />
                    <select name="status" value={newOrder.status} onChange={handleNewOrderChange} required>
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <button type="submit">Add Order</button>
                  
                </form>
                 )}
                <div className="filter-container">
                  {/* Filter Icon */}
                {/* Filter Options */}
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
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.user}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                  
                  
                  
                </tbody>
              </table>
            </div>

            <div className="todo">
              <div className="head" onClick={() => setShowTodosList(!showTodosList)}>
                <h3>Todos</h3>
                <Plus className="icon data-icon" size={20} onClick={() => setShowTodoForm(true)} />
                
              </div>
              {/* Show Todos List */}
              {showTodosList && (
              <div className="todos-list">
               {todos.map((todo) => (
                <div className="todo-item" key={todo.id}>
                 <span className="todo-text">{todo.text}</span>
               </div>
                ))}
              </div>
                )}
                {/* Add Todo Form */}
      {showTodoForm && (
        <form className="add-product-form" onSubmit={handleAddTodo}>
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={handleNewTodoChange}
            required
          />
          <button type="submit" className="todos-button">OK</button>
          <button type="button" onClick={() => setShowTodoForm(false)}>Cancel</button>
        </form>
      )}
              
              <div className="todos-list">
                {todoItems.map((item, index) => (
                <div className="todo-item" key={index}>
                 <span className="todo-icon" style={{ backgroundColor: item.color }}></span>
                 <span className="todo-text">{item}</span>
                 <span className="todo-options">⋮</span>
                </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
export default Dashboard;

