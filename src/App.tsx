import { Routes, Route, Navigate } from 'react-router-dom'
import SceneCanvas from './three/SceneCanvas'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import AriaShowcase from './components/AriaShowcase'
import Act4About from './components/Act4About'
import Act4Toolkit from './components/Act4Toolkit'
import Act4Experience from './components/Act4Experience'
import SolenneSection from './components/SolenneSection'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ARIACaseStudy from './components/ARIACaseStudy'

function HomePage() {
  return (
    <div className="min-h-screen bg-void text-bone font-sans">
      <SceneCanvas />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Projects />
        <AriaShowcase />
        <Act4About />
        <Act4Toolkit />
        <Act4Experience />
        <SolenneSection />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aria" element={<ARIACaseStudy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
