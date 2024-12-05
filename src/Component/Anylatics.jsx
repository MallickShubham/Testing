import './Style/style.css';
import { LayoutDashboard, Package, AlertTriangle, CheckCircle, Power, PowerOff, Users, Bell, Sun, Moon, Search, Download, ChevronRight, Filter, Plus,ChevronDown,LineChart } from 'lucide-react';
import { BsCalendarCheck, BsPeople, BsCurrencyDollar } from 'react-icons/bs';
import React, { useState, useEffect } from 'react';
import ReactEcharts from "echarts-for-react";

  
const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c"];
function Anylatics() {

  const [isOpen, setIsOpen] = useState(() => {
    return localStorage.getItem('sidebarOpen') === 'true';
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
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

  

  

  const [showSignInPopup, setShowSignInPopup] = useState(false);

    const toggleSignInPopup = () => {
        setShowSignInPopup(prevShowSignInPopup => !prevShowSignInPopup);
    };

    const [showNotification, setShowNotification] = useState(false);

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const getPieChartOption = (title, data) => ({
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: title,
        type: "pie",
        radius: "50%",
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  });

  const getBarChartOption = (title, data) => ({
    title: {
      text: title,
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.map((item) => item.value),
        type: "bar",
        itemStyle: {
          color: (_, index) => COLORS[index % COLORS.length],
        },
      },
    ],
  });

  const pieData = [
    { name: "Total Sell", value: 1048 },
    { name: "Total Complaints", value: 735 },
  ];

  const barData = [
    { name: "Closed Complaints", value: 580 },
    { name: "Total Commissioning", value: 484 },
    { name: "Closed Commissioning", value: 300 },
  ];


  

  

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
      <div className={`main-content ${isOpen ? "shifted" : ""} ${darkMode ? "dark" : ""}`}>
        <div className="header">
          <h1>Analytics</h1>
          <div className="breadcrumb">
            Dashboard <ChevronRight className="icon ChevronRight" size={15} /> Analytics
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="dashboard-container">
          <div className="chart-row">
            {/* Total Sell Pie Chart */}
            <div className="chart-card">
              <div className="chart-container">
                <ReactEcharts option={getPieChartOption("Total Sell", pieData)} />
              </div>
            </div>

            {/* Total Commissioning Bar Chart */}
            <div className="chart-card">
              <div className="chart-container">
                <ReactEcharts option={getBarChartOption("Total Commissioning", barData)} />
              </div>
            </div>
          </div>

          <div className="chart-row">
            {/* Total Complaints Pie Chart */}
            <div className="chart-card">
              <div className="chart-container">
                <ReactEcharts option={getPieChartOption("Total Complaints", pieData)} />
              </div>
            </div>

            {/* Closed Component Bar Chart */}
            <div className="chart-card">
              <div className="chart-container">
                <ReactEcharts option={getBarChartOption("Closed Component", barData)} />
              </div>
            </div>

            {/* Closed Commissioning Bar Chart */}
            <div className="chart-card">
              <div className="chart-container">
                <ReactEcharts option={getBarChartOption("Closed Commissioning", barData)} />
              </div>
            </div>
          </div>

          <div className="stats-row">
            {[...pieData, ...barData].map((item) => (
              <div key={item.name} className="stat-card">
                <h4>{item.name}</h4>
                <p className="stat-value">{item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
      
</div>
  )
}
export default Anylatics;

