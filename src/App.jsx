import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { APIPlayground } from './pages/APIPlayground'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { DashboardHome } from './pages/Dashboard/DashboardHome'
import { LiveCalls } from './pages/Dashboard/LiveCalls'
import { Bookings } from './pages/Dashboard/Bookings'
import { Drivers } from './pages/Dashboard/Drivers'
import { Analytics } from './pages/Dashboard/Analytics'
import { Dispatch } from './pages/Dashboard/Dispatch'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/api-docs" element={<APIPlayground />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout><DashboardHome /></DashboardLayout>} />
        <Route path="/dashboard/calls" element={<DashboardLayout><LiveCalls /></DashboardLayout>} />
        <Route path="/dashboard/bookings" element={<DashboardLayout><Bookings /></DashboardLayout>} />
        <Route path="/dashboard/drivers" element={<DashboardLayout><Drivers /></DashboardLayout>} />
        <Route path="/dashboard/dispatch" element={<DashboardLayout><Dispatch /></DashboardLayout>} />
        <Route path="/dashboard/analytics" element={<DashboardLayout><Analytics /></DashboardLayout>} />
      </Routes>
    </Router>
  )
}

export default App
