import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './component/Home/Home';
import CardDetail from './component/Card/CardDetail'
import Login from './component/Login/Login';
import Register from './component/Register/Register';
import Profile from './component/Profile/Profile';
// import ScrollCartButton from './component/ScrollCartButton/ScrollCartButton';

//react router
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import StickyNavbar from './component/Header/StickyNavbar';

function App() {
  return (
    <div className="App">
    <StickyNavbar />
    

    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<CardDetail/>} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path='/profile' element={<Profile />} />




    </Routes>
    <ToastContainer />



 
   

    </div>
  );
}

export default App;
