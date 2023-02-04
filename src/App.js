import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Food from './pages/Food';
// import Contact from './pages/Contact';
import MovieDetail from './pages/MovieDetail';

import { useContext } from 'react';
import DataContext from './DataContext';
import { AuthContextProvider } from './context/AuthContext';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import Seat from './pages/Seat';
import Tickets from './pages/Tickets';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentSuccessful from './pages/PaymentSuccessful';

function App() {

  const { allMovies } = useContext(DataContext);

  const MovieWithID = () => {
    const { id } = useParams();
    return (
      <MovieDetail movie={allMovies.filter((movie) => movie.id === parseInt(id, 10))[0]} />
    )
  }

  const SeatWithID = () => {
    const { id } = useParams();
    const location = useLocation()
    const { day, time, auditorium, unavailableSeats } = location.state
    return (
      <Seat movie={allMovies.filter((movie) => movie.id === parseInt(id, 10))[0]}
        day={day}
        time={time}
        auditorium={auditorium}
        unavailableSeats={unavailableSeats}
      />
    )
  }

  const TicketsWithID = () => {
    const { id } = useParams();
    const location = useLocation()
    const { day, time, auditorium, seats } = location.state
    return (
      <Tickets movie={allMovies.filter((movie) => movie.id === parseInt(id, 10))[0]}
        day={day}
        time={time}
        auditorium={auditorium}
        seats={seats}
      />
    )
  }

  return (
    <>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/:id' element={<MovieWithID />} />
          <Route path='/:id/seat' element={<SeatWithID />} />
          <Route path='/:id/tickets' element={<TicketsWithID />} />
          {/* <Route exact path='/food' element={<Food />} /> */}
          {/* <Route exact path='/contact' element={<Contact />} /> */}
          <Route exact path='/signin' element={<SignIn />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route
            exact path='/account'
            element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route exact path='/paymentsuccessful' element={<PaymentSuccessful />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
