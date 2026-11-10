import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Mapa from './pages/Mapa'
import Ocorrencias from './pages/Ocorrencias'
import Informacoes from './pages/Informacoes'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/ocorrencias" element={<Ocorrencias />} />
        <Route path="/informacoes" element={<Informacoes />} />
      </Routes>
    </div>
  )
}

export default App