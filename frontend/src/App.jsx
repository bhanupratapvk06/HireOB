import {Route,Routes,useLocation} from 'react-router-dom'
import Home from './pages/Home/Home'
import Jobs from './pages/Jobs/Jobs'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import JobDetail from './pages/Jobs/JobDetail'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About.jsx'
import Login from './pages/Login/Login.jsx'


const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <NavBar/>}
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/jobs' element = {<Jobs/>}/>
        <Route path='/job/:id' element={<JobDetail/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element = {<About/>}/>
        <Route path='/login' element = {<Login/>}/>
      </Routes>
      {!hideLayout && <Footer/>}
    </>
  )
}

export default App
