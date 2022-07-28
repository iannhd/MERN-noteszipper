
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import LandingPage from './screens/LandingPage/LandingPage';
import LoginPage from './screens/LoginPage/LoginPage';
import RegisterPage from './screens/RegisterPage/RegisterPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MyNotes from './screens/MyNotes/MyNotes';
function App() {
  return (
    <Router>
    <Header/>
      <main>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/mynotes' element={<MyNotes/>} />
      </Routes>
      </main>
    <Footer/>
    </Router>
  );
}

export default App;
