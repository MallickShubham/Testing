

import './App.css';
import Dashboard from './Component/Dashboard';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Product from './Component/Product';
import ActiveComplaints from './Component/ActiveComplaints';
import ClosedComplaints from './Component/ClosedComplaints';
import Anylatics from './Component/Anylatics';
import ActiveCommissioning from './Component/ActiveCommissioning';
import LoginSignupPage from './Component/LoginSignupPage';
import ClosedCommissioning from './Component/ClosedCommissioning';
import Customer from './Component/Customer';


function App() {
  return(
    
      <Router>
        <Routes>
        <Route path="/login page" element={<LoginSignupPage />} />
          <Route path="/dashboard" element={< Dashboard /> } />
          <Route path="/Product" element={<Product/>} />
          <Route path="/Active Complaints" element={<ActiveComplaints/>} />
          <Route path="/Closed Complaints" element={<ClosedComplaints/>} />
          <Route path="/Anylatics" element={<Anylatics/>} />
          <Route path="/Active Commissioning" element={<ActiveCommissioning/>} />
          <Route path="/Closed Commissioning" element={<ClosedCommissioning/>} />
          <Route path="/Customers" element={<Customer/>} />
          
          
        </Routes>
      </Router>
    
  );
}

export default App;
