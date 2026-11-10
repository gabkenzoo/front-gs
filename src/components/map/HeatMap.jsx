import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { tiposPonto, coresTipo, coresNivel } from '../../utils/constantes'

// componente que avisa a página quando o usuário clica no mapa
function CapturaClique({ onClicar }) {
  useMapEvents({
    click(evento) {
      if (onClicar) {
        onClicar(evento.latlng.lat, evento.latlng.lng)
      }
    },
  })
  return null
}

function nomeDoTipo(valor) {
  const tipo = tiposPonto.find((item) => item.valor === valor)
  return tipo ? tipo.nome : valor
}

function HeatMap({ centro, pontos, nivel, novaPosicao, onClicar }) {
  return (
    <MapContainer
      center={centro}
      zoom={14}
      className="h-96 w-full rounded-lg border border-gray-200"
    >
      <TileLayer
        attribution='&copy; Colaboradores do <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <CapturaClique onClicar={onClicar} />

      {/* círculo do nível de atenção, só aparece quando o clima já chegou */}
      {nivel && (
        <Circle
          center={centro}
          radius={1500}
          pathOptions={{ color: coresNivel[nivel], fillOpacity: 0.15 }}
        >
          <Popup>
            Nível de atenção estimado para a cidade: {nivel}. É uma estimativa
            geral com clima e horário, não separa bairros.
          </Popup>
        </Circle>
      )}

      {pontos.map((ponto) => (
        <CircleMarker
          key={ponto.id}
          center={[ponto.latitude, ponto.longitude]}
          radius={9}
          pathOptions={{
            color: '#ffffff',
            weight: 2,
            fillColor: coresTipo[ponto.tipo],
            fillOpacity: 1,
          }}
        >
          <Popup>
            <strong>{ponto.nome}</strong>
            <br />
            {nomeDoTipo(ponto.tipo)}
            {ponto.descricao && (
              <>
                <br />
                {ponto.descricao}
              </>
            )}
          </Popup>
        </CircleMarker>
      ))}

      {/* marcador do local escolhido para cadastrar um ponto novo */}
      {novaPosicao && (
        <CircleMarker
          center={[novaPosicao.latitude, novaPosicao.longitude]}
          radius={9}
          pathOptions={{ color: '#000000', fillColor: '#facc15', fillOpacity: 1 }}
        />
      )}
    </MapContainer>
  )
}

export default HeatMap
