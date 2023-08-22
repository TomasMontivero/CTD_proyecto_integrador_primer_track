import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main'
import Footer from './components/Footer';
import Login from './components/Login'
import Register from './components/Register'
import { ProductDetail } from './components/ProductDetail';
import { ProductReservation } from './components/ProductReservation';
import WidthContextProvider, { useWidthContext, UserLoggedContext, ComesFromDetailProvider, UserContext } from './context';
import { useState, useEffect } from 'react';
import { ReservationSuccess } from './components/ReservationSuccess';
import Administration from './components/Administration';
import { getUsers } from './services/api';
import ProductCreationSuccess from './components/ProductCreationSuccess';

export const breakpointMobile = 576;
export const isMobile = (width) => width <= breakpointMobile

function App() {
  const [ userLogged, setUserLogged ] = useState(false);
  const [ user, setUser ] = useState({})

  return (
    <WidthContextProvider>
      <UserLoggedContext.Provider value={ [userLogged, setUserLogged] }>
        <UserContext.Provider value={ [ user, setUser ]}>
        <ComesFromDetailProvider>
          <Header />
          <div id='mainContent'>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/administration" element={<Administration />} />
              <Route path="/product/:id" element={<ProductDetail />}></Route>
              <Route path="/product/:id/reservation" element={<ProductReservation />}></Route>
              <Route path="/reservationSuccess" element={<ReservationSuccess />}></Route>
              <Route path="/productCreated" element={<ProductCreationSuccess />}></Route>
            </Routes>
          </div>
          <Footer />
        </ComesFromDetailProvider>
        </UserContext.Provider>
      </UserLoggedContext.Provider>
    </WidthContextProvider>
  );
}

export default App;
