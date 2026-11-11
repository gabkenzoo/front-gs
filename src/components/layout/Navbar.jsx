import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  // guarda se o menu do celular está aberto (true) ou fechado (false)
  const [menuAberto, setMenuAberto] = useState(false)

    const links = [
    { caminho: '/', nome: 'Dashboard' },
    { caminho: '/mapa', nome: 'Mapa' },
    { caminho: '/rota', nome: 'Rota Fresca' },
    { caminho: '/ocorrencias', nome: 'Ocorrências' },
    { caminho: '/informacoes', nome: 'Informações' },
  ]

  // muda o estilo do link que está na página atual
  function estiloLink({ isActive }) {
    if (isActive) {
      return 'text-white font-bold border-b-2 border-yellow-400 pb-1'
    }
    return 'text-green-100 hover:text-white'
  }

  return (
    <header className="bg-green-900">
      <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <span className="text-xl font-bold text-white">SombraViva</span>

        {/* botão que só aparece no celular */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir ou fechar o menu"
        >
          ☰
        </button>

        {/* menu do computador */}
        <ul className="hidden md:flex gap-6">
          {links.map((link) => (
            <li key={link.caminho}>
              <NavLink
                to={link.caminho}
                end={link.caminho === '/'}
                className={estiloLink}
              >
                {link.nome}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* menu do celular, só aparece quando menuAberto é true */}
      {menuAberto && (
        <ul className="md:hidden flex flex-col gap-3 px-4 pb-4">
          {links.map((link) => (
            <li key={link.caminho}>
              <NavLink
                to={link.caminho}
                end={link.caminho === '/'}
                className={estiloLink}
                onClick={() => setMenuAberto(false)}
              >
                {link.nome}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar