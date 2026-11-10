import { useState } from 'react'
import ReportForm from '../components/reports/ReportForm'
import ReportList from '../components/reports/ReportList'
import useReports from '../hooks/useReports'
import { categorias, listaStatus } from '../utils/constantes'

function Ocorrencias() {
  const { relatos, carregando, erro, criar, atualizar, excluir } = useReports()

  const [relatoEditando, setRelatoEditando] = useState(null)
  const [aviso, setAviso] = useState(null)
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  // devolve true se salvou e false se deu erro (o formulário usa isso)
  async function salvar(dados) {
    try {
      if (dados.id) {
        await atualizar(dados.id, dados)
        setRelatoEditando(null)
        setAviso({ tipo: 'sucesso', texto: 'Relato atualizado com sucesso.' })
      } else {
        await criar(dados)
        setAviso({ tipo: 'sucesso', texto: 'Relato cadastrado com sucesso.' })
      }
      return true
    } catch (e) {
      setAviso({ tipo: 'erro', texto: 'Não foi possível salvar: ' + e.message })
      return false
    }
  }

  async function remover(relato) {
    const confirmou = window.confirm('Deseja excluir este relato?')
    if (!confirmou) {
      return
    }

    try {
      await excluir(relato.id)
      setAviso({ tipo: 'sucesso', texto: 'Relato excluído.' })
    } catch (e) {
      setAviso({ tipo: 'erro', texto: 'Não foi possível excluir: ' + e.message })
    }
  }

  // aplica os filtros escolhidos
  const relatosFiltrados = relatos.filter((relato) => {
    const categoriaOk = filtroCategoria === '' || relato.categoria === filtroCategoria
    const statusOk = filtroStatus === '' || relato.status === filtroStatus
    return categoriaOk && statusOk
  })

  const classeFiltro = 'border border-gray-300 rounded p-2 bg-white'

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Ocorrências</h1>

      {aviso && (
        <p
          className={
            aviso.tipo === 'sucesso'
              ? 'bg-green-100 text-green-800 p-3 rounded mb-4'
              : 'bg-red-100 text-red-800 p-3 rounded mb-4'
          }
        >
          {aviso.texto}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ReportForm
          relatoEditando={relatoEditando}
          onSalvar={salvar}
          onCancelar={() => setRelatoEditando(null)}
        />

        <div>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className={classeFiltro}
            >
              <option value="">Todas as categorias</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className={classeFiltro}
            >
              <option value="">Todos os status</option>
              {listaStatus.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>

          {carregando && <p className="text-gray-500">Carregando relatos...</p>}

          {erro && (
            <p className="bg-red-100 text-red-800 p-3 rounded">
              Erro ao carregar os relatos: {erro}
            </p>
          )}

          {!carregando && !erro && (
            <ReportList
              relatos={relatosFiltrados}
              onEditar={setRelatoEditando}
              onExcluir={remover}
            />
          )}
        </div>
      </div>
    </main>
  )
}

export default Ocorrencias