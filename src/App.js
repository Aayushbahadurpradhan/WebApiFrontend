//short cut////////
//////////////// rafce /////////////

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
//for showing toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        {/* Homepage route */}
        <Route path='/home' element={<Homepage />} />
        {/* create register route */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Admin routes */}
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
