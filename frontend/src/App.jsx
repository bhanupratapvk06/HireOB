import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Jobs from './pages/Jobs/Jobs'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import JobDetail from './pages/Jobs/JobDetail'

const App = () => {

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/jobs' element = {<Jobs/>}/>
        <Route path='/job/:id' element={<JobDetail/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
