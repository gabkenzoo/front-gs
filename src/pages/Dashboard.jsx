import DashboardCard from '../components/dashboard/DashboardCard'
import TemperatureCard from '../components/dashboard/TemperatureCard'
import useWeather from '../hooks/useWeather'
import useReports from '../hooks/useReports'
import usePoints from '../hooks/usePoints'
import { calcularIndice } from '../utils/heatIndex'
import { cidadePadrao } from '../utils/constantes'

// recomendações de proteção para cada nível de atenção
const recomendacoes = {
  baixo: [
    'Condições mais favoráveis, mas continue bebendo água.',
    'Use protetor solar se for ficar muito tempo na rua.',
  ],
  atencao: [
    'Faça pausas na sombra e beba água com frequência.',
    'Evite esforço físico intenso nas horas mais quentes.',
    'Procure um ponto de apoio no mapa antes de sair.',
  ],
  alto: [
    'Evite ficar exposto ao sol, procure proteção.',
    'Beba água mesmo sem sentir sede e descanse em local fresco.',
    'Se sentir tontura, dor de cabeça forte ou mal-estar, procure ajuda médica.',
  ],
}

// mostra reticências enquanto carrega e traços se der erro
function valorDoCartao(valor, carregando, erro) {
  if (carregando) {
    return '...'
  }
  if (erro) {
    return '--'
  }
  return valor
}

function Dashboard() {
  const { clima, carregando, erro, atualizar } = useWeather(
    cidadePadrao.latitude,
    cidadePadrao.longitude
  )
  const { relatos, carregando: carregandoRelatos, erro: erroRelatos } = useReports()
  const { pontos, carregando: carregandoPontos, erro: erroPontos } = usePoints()

  // só calcula o índice quando o clima já chegou
  let indice = null
  if (clima) {
    indice = calcularIndice({
      temperatura: clima.temperatura,
      umidade: clima.umidade,
      hora: new Date().getHours(),
    })
  }

  const totalFontes = pontos.filter((ponto) => ponto.tipo === 'agua').length
  const totalAlto = relatos.filter((relato) => relato.nivel_atencao === 'alto').length

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <DashboardCard
          titulo="Pontos de apoio"
          valor={valorDoCartao(pontos.length, carregandoPontos, erroPontos)}
          descricao="Cadastrados na API"
        />
        <DashboardCard
          titulo="Fontes de água"
          valor={valorDoCartao(totalFontes, carregandoPontos, erroPontos)}
          descricao="Pontos do tipo fonte de água"
        />
        <DashboardCard
          titulo="Relatos da comunidade"
          valor={valorDoCartao(relatos.length, carregandoRelatos, erroRelatos)}
          descricao="Ocorrências registradas na API"
        />
        <DashboardCard
          titulo="Relatos de nível alto"
          valor={valorDoCartao(totalAlto, carregandoRelatos, erroRelatos)}
          descricao="Relatos com atenção alta"
        />
      </div>

      {indice && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-bold text-green-900 mb-2">Recomendações de proteção</h2>
          <ul className="list-disc pl-5 text-gray-700 flex flex-col gap-1">
            {recomendacoes[indice.nivel].map((texto) => (
              <li key={texto}>{texto}</li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}

export default Dashboard
