import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
      <h2 className="font-bold text-green-900 mb-3">Atalhos</h2>
      <ul className="flex flex-col gap-2 mb-6">
        <li>
          <Link to="/ocorrencias" className="text-green-800 hover:underline">
            Registrar uma ocorrência
          </Link>
        </li>
        <li>
          <Link to="/mapa" className="text-green-800 hover:underline">
            Ver pontos de apoio no mapa
          </Link>
        </li>
        <li>
          <Link to="/informacoes" className="text-green-800 hover:underline">
            Saiba mais sobre o projeto
          </Link>
        </li>
      </ul>

      <h2 className="font-bold text-green-900 mb-3">Dicas de proteção</h2>
      <ul className="text-sm text-gray-700 flex flex-col gap-2 list-disc pl-4">
        <li>Beba água mesmo sem sentir sede.</li>
        <li>Evite o sol entre 11h e 16h.</li>
        <li>Procure sombra e faça pausas.</li>
        <li>Use roupas leves e protetor solar.</li>
      </ul>
    </aside>
  )
}

export default Sidebar