import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Footer from './components/layout/Footer'
import Dashboard from './pages/Dashboard'
import Mapa from './pages/Mapa'
import Ocorrencias from './pages/Ocorrencias'
import Informacoes from './pages/Informacoes'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/ocorrencias" element={<Ocorrencias />} />
            <Route path="/informacoes" element={<Informacoes />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App