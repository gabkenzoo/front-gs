import { useState } from 'react'
import HeatMap from '../components/map/HeatMap'
import SupportPointCard from '../components/points/SupportPointCard'
import PointForm from '../components/points/PointForm'
import usePoints from '../hooks/usePoints'
import useWeather from '../hooks/useWeather'
import { calcularIndice } from '../utils/heatIndex'
import { cidadePadrao, tiposPonto, coresTipo } from '../utils/constantes'

function Mapa() {
  const { pontos, carregando, erro, criar } = usePoints()
  const { clima } = useWeather(cidadePadrao.latitude, cidadePadrao.longitude)
  const [filtroTipo, setFiltroTipo] = useState('')
  const [novaPosicao, setNovaPosicao] = useState(null)
  const [aviso, setAviso] = useState(null)

  // calcula o nível de atenção quando o clima já chegou
  let nivel = null
  if (clima) {
    nivel = calcularIndice({
      temperatura: clima.temperatura,
      umidade: clima.umidade,
      hora: new Date().getHours(),
    }).nivel
  }

  // guarda o local onde o usuário clicou no mapa
  function escolherLocal(latitude, longitude) {
    setNovaPosicao({ latitude, longitude })
  }

  // devolve true se salvou e false se deu erro (o formulário usa isso)
  async function salvar(dados) {
    try {
      await criar(dados)
      setNovaPosicao(null)
      setAviso({ tipo: 'sucesso', texto: 'Ponto cadastrado com sucesso.' })
      return true
    } catch (e) {
      setAviso({ tipo: 'erro', texto: 'Não foi possível salvar: ' + e.message })
      return false
    }
  }

  const pontosFiltrados = pontos.filter(
    (ponto) => filtroTipo === '' || ponto.tipo === filtroTipo
  )

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-900">Mapa</h1>
      <p className="text-sm text-gray-500 mb-4">
        Pontos de apoio cadastrados pela comunidade em {cidadePadrao.nome}. Para
        cadastrar um ponto novo, clique no mapa no local dele.
      </p>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="border border-gray-300 rounded p-2 bg-white mb-3"
          >
            <option value="">Todos os tipos</option>
            {tiposPonto.map((tipo) => (
              <option key={tipo.valor} value={tipo.valor}>
                {tipo.nome}
              </option>
            ))}
          </select>

          <HeatMap
            centro={[cidadePadrao.latitude, cidadePadrao.longitude]}
            pontos={pontosFiltrados}
            nivel={nivel}
            novaPosicao={novaPosicao}
            onClicar={escolherLocal}
          />

          <ul className="flex flex-wrap gap-3 mt-3 text-sm text-gray-700">
            {tiposPonto.map((tipo) => (
              <li key={tipo.valor} className="flex items-center gap-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: coresTipo[tipo.valor] }}
                ></span>
                {tipo.nome}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-6">
          <PointForm posicao={novaPosicao} onSalvar={salvar} />

          <div>
            <h2 className="font-bold text-green-900 mb-3">Pontos cadastrados</h2>

            {carregando && <p className="text-gray-500">Carregando pontos...</p>}

            {erro && (
              <p className="bg-red-100 text-red-800 p-3 rounded">
                Erro ao carregar os pontos: {erro}
              </p>
            )}

            {!carregando && !erro && pontosFiltrados.length === 0 && (
              <p className="bg-white rounded-lg border border-gray-200 p-4 text-gray-500">
                Nenhum ponto encontrado.
              </p>
            )}

            <div className="flex flex-col gap-3">
              {pontosFiltrados.map((ponto) => (
                <SupportPointCard key={ponto.id} ponto={ponto} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Mapa
