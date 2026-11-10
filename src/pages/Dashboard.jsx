import DashboardCard from '../components/dashboard/DashboardCard'
import TemperatureCard from '../components/dashboard/TemperatureCard'
import useWeather from '../hooks/useWeather'
import useReports from '../hooks/useReports'
import { calcularIndice } from '../utils/heatIndex'
import { cidadePadrao } from '../utils/constantes'

function Dashboard() {
  const { clima, carregando, erro, atualizar } = useWeather(
    cidadePadrao.latitude,
    cidadePadrao.longitude
  )
  const { relatos, carregando: carregandoRelatos, erro: erroRelatos } = useReports()

  // só calcula o índice quando o clima já chegou
  let indice = null
  if (clima) {
    indice = calcularIndice({
      temperatura: clima.temperatura,
      umidade: clima.umidade,
      hora: new Date().getHours(),
    })
  }

  // valor do cartão de relatos: reticências enquanto carrega, traços se der erro
  let totalRelatos = relatos.length
  if (carregandoRelatos) {
    totalRelatos = '...'
  } else if (erroRelatos) {
    totalRelatos = '--'
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Dashboard</h1>

      <div className="mb-4">
        {carregando && <p className="text-gray-500">Carregando o clima...</p>}

        {erro && (
          <div className="bg-red-100 text-red-800 p-3 rounded">
            <p>{erro}</p>
            <button
              onClick={atualizar}
              className="mt-2 border border-red-600 px-3 py-1 rounded hover:bg-red-50"
            >
              Tentar de novo
            </button>
          </div>
        )}

        {clima && (
          <>
            <TemperatureCard
              cidade={cidadePadrao.nome}
              temperatura={clima.temperatura}
              umidade={clima.umidade}
              nivel={indice.nivel}
            />
            <p className="text-sm text-gray-600 mt-2">
              Pontuação do índice: {indice.pontuacao} de 100
            </p>
            <p className="text-xs text-gray-500">
              Índice experimental criado pela equipe, calculado com temperatura,
              umidade e horário. Não é um diagnóstico médico nem um índice oficial.
              Dados do clima: Open-Meteo.
            </p>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard
          titulo="Pontos de apoio"
          valor="--"
          descricao="Cadastro de pontos ainda não implementado"
        />
        <DashboardCard
          titulo="Fontes de água"
          valor="--"
          descricao="Cadastro de pontos ainda não implementado"
        />
        <DashboardCard
          titulo="Relatos da comunidade"
          valor={totalRelatos}
          descricao="Ocorrências registradas na API"
        />
      </div>
    </main>
  )
}

export default Dashboard
