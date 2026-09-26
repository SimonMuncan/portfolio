import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Act4Experience from './components/Act4Experience'
import Building from './components/Building'
import Act4Toolkit from './components/Act4Toolkit'
import Act4About from './components/Act4About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SitheaCaseStudy from './components/SitheaCaseStudy'
import ChatWidget from './components/ChatWidget'

function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Act4Experience />
        <Building />
        <Act4Toolkit />
        <Act4About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sithea" element={<SitheaCaseStudy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ChatWidget />
    </>
  )
}
