import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
  useMapEvents,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { coresTipo } from '../../utils/constantes'

// avisa a página quando o usuário clica no mapa
function CapturaClique({ onClicar }) {
  useMapEvents({
    click(evento) {
      onClicar(evento.latlng.lat, evento.latlng.lng)
    },
  })
  return null
}

function RouteMap({ centro, pontos, origem, destino, onClicar }) {
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

      {pontos.map((ponto) => (
        <CircleMarker
          key={ponto.id}
          center={[ponto.latitude, ponto.longitude]}
          radius={7}
          pathOptions={{
            color: '#ffffff',
            weight: 2,
            fillColor: coresTipo[ponto.tipo],
            fillOpacity: 1,
          }}
        >
          <Popup>{ponto.nome}</Popup>
        </CircleMarker>
      ))}

      {origem && destino && (
        <Polyline
          positions={[
            [origem.latitude, origem.longitude],
            [destino.latitude, destino.longitude],
          ]}
          pathOptions={{ color: '#166534', weight: 4, dashArray: '8 8' }}
        />
      )}

      {origem && (
        <CircleMarker
          center={[origem.latitude, origem.longitude]}
          radius={10}
          pathOptions={{ color: '#000000', fillColor: '#22c55e', fillOpacity: 1 }}
        >
          <Popup>Origem</Popup>
        </CircleMarker>
      )}

      {destino && (
        <CircleMarker
          center={[destino.latitude, destino.longitude]}
          radius={10}
          pathOptions={{ color: '#000000', fillColor: '#ef4444', fillOpacity: 1 }}
        >
          <Popup>Destino</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  )
}

export default RouteMap
