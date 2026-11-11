import { useState } from 'react'
import RouteMap from '../components/map/RouteMap'
import usePoints from '../hooks/usePoints'
import useWeather from '../hooks/useWeather'
import { calcularIndice } from '../utils/heatIndex'
import { cidadePadrao, tiposPonto } from '../utils/constantes'
import { distanciaEmMetros, pontosPertoDaLinha } from '../utils/rotaFresca'

const RAIO_METROS = 300

function nomeDoTipo(valor) {
  const tipo = tiposPonto.find((item) => item.valor === valor)
  return tipo ? tipo.nome : valor
}

function RotaFresca() {
  const { pontos, carregando, erro } = usePoints()
  const { clima } = useWeather(cidadePadrao.latitude, cidadePadrao.longitude)

  const [origem, setOrigem] = useState(null)
  const [destino, setDestino] = useState(null)
  // diz o que o próximo clique no mapa vai escolher: 'origem' ou 'destino'
  const [escolhendo, setEscolhendo] = useState('origem')

  function aoClicarNoMapa(latitude, longitude) {
    if (escolhendo === 'origem') {
      setOrigem({ latitude, longitude })
      setEscolhendo('destino')
    } else {
      setDestino({ latitude, longitude })
    }
  }

  function limpar() {
    setOrigem(null)
    setDestino(null)
    setEscolhendo('origem')
  }

  const hora = new Date().getHours()
  const solForte = hora >= 11 && hora <= 16

  let nivel = null
  if (clima) {
    nivel = calcularIndice({
      temperatura: clima.temperatura,
      umidade: clima.umidade,
      hora: hora,
    }).nivel
  }

  // só calcula depois que origem e destino foram escolhidos
  let distancia = 0
  let pontosDoTrajeto = []
  if (origem && destino) {
    distancia = distanciaEmMetros(origem, destino)
    pontosDoTrajeto = pontosPertoDaLinha(pontos, origem, destino, RAIO_METROS)
  }

  const classeBotao = 'px-3 py-2 rounded border'

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-900">Rota Fresca</h1>

      <p className="bg-yellow-100 text-yellow-900 p-3 rounded my-4 text-sm">
        Esta é uma simulação. O app desenha uma linha reta entre a origem e o
        destino, que não segue as ruas, e mostra os pontos de apoio cadastrados
        perto dessa linha. Ainda não usamos dados reais de sombra por rua.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <button
              onClick={() => setEscolhendo('origem')}
              className={
                classeBotao +
                (escolhendo === 'origem'
                  ? ' bg-green-800 text-white border-green-800'
                  : ' border-gray-300 bg-white')
              }
            >
              Escolher origem
            </button>
            <button
              onClick={() => setEscolhendo('destino')}
              className={
                classeBotao +
                (escolhendo === 'destino'
                  ? ' bg-green-800 text-white border-green-800'
                  : ' border-gray-300 bg-white')
              }
            >
              Escolher destino
            </button>
            <button
              onClick={limpar}
              className={classeBotao + ' border-gray-300 bg-white'}
            >
              Limpar
            </button>
          </div>

          <RouteMap
            centro={[cidadePadrao.latitude, cidadePadrao.longitude]}
            pontos={pontos}
            origem={origem}
            destino={destino}
            onClicar={aoClicarNoMapa}
          />

          <p className="text-sm text-gray-500 mt-2">
            Clique no mapa para marcar a {escolhendo}. A origem aparece em verde
            e o destino em vermelho.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="font-bold text-green-900 mb-2">Resultado</h2>

          {carregando && <p className="text-gray-500">Carregando pontos...</p>}

          {erro && (
            <p className="bg-red-100 text-red-800 p-3 rounded">
              Erro ao carregar os pontos: {erro}
            </p>
          )}

          {!origem && !destino && (
            <p className="text-gray-500">
              Escolha a origem e o destino no mapa para ver o resultado.
            </p>
          )}

          {origem && !destino && (
            <p className="text-gray-500">Agora escolha o destino no mapa.</p>
          )}

          {origem && destino && (
            <div>
              <p className="text-gray-700">
                Distância em linha reta: {Math.round(distancia)} m
              </p>

              {solForte && (
                <p className="text-sm text-orange-700 mt-2">
                  Agora é horário de sol forte (11h às 16h). Se puder, adie o
                  trajeto.
                </p>
              )}

              {nivel === 'alto' && (
                <p className="text-sm text-orange-700 mt-2">
                  O nível de atenção ao calor está alto agora. Faça pausas e
                  beba água.
                </p>
              )}

              <h3 className="font-bold text-green-900 mt-4 mb-2">
                Pontos de apoio até {RAIO_METROS} m da linha
              </h3>

              {pontosDoTrajeto.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Nenhum ponto cadastrado perto desse trajeto. Você pode
                  cadastrar um na página do Mapa.
                </p>
              )}

              <ul className="flex flex-col gap-2">
                {pontosDoTrajeto.map((ponto) => (
                  <li key={ponto.id} className="text-sm text-gray-700">
                    <strong>{ponto.nome}</strong> ({nomeDoTipo(ponto.tipo)}) a{' '}
                    {ponto.distancia} m da linha
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default RotaFresca
