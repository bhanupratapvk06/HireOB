import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import Jobs from './pages/Jobs/Jobs'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import JobDetail from './pages/Jobs/JobDetail'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About.jsx'
import Auth from './pages/Auth/Auth.jsx'

import { DashboardLayout } from './components/layout/DashboardLayout.jsx'
import Applications from './pages/Applications/Applications.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import ExternalTrackecr from './pages/ExternalTracker/ExternalTracker.jsx'
import Companies from './pages/Companies/Companies.jsx'
import Analytics from './pages/Analytics/Analytics.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Profile from './pages/Profile/Profile.jsx'


const App = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/dashboard");
  const hideLayout = isAuthPage || isAdminRoute;


  return (
    <>
      {!hideLayout && <NavBar />}
      <Routes>
        {/* PUBLIC */}
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/job/:id' element={<JobDetail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Auth />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="applications" element={<Applications />} />
          <Route path="external" element={<ExternalTrackecr />} />
          <Route path="profile" element={<Profile />} />
          <Route path="companies" element={<Companies />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>


      {!hideLayout && <Footer />}
    </>
  )
}

export default App;
