import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import UsinePage from './pages/UsinePage';
import GrandsComptesPage from './pages/GrandsComptesPage';
import VisionPage from './pages/VisionPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AssistantPage from './pages/AssistantPage';
import CalBookingPage from './pages/CalBookingPage';
import SacLandingPage from './pages/SacLandingPage';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isSacPage = location.pathname.replace(/\/$/, '') === '/sac';

  return (
    <div className="App bg-[#F9F8EF] min-h-screen">
      {!isSacPage && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sac" element={<SacLandingPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/reservation" element={<CalBookingPage />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/usine" element={<UsinePage />} />
        <Route path="/grands-comptes" element={<GrandsComptesPage />} />
        <Route path="/vision" element={<VisionPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
      </Routes>
      {!isSacPage && <Footer />}
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
