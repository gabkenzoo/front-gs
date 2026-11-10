import { tiposPonto } from '../../utils/constantes'

// Cartão com as informações de um ponto de apoio
function SupportPointCard({ ponto }) {
  const tipo = tiposPonto.find((item) => item.valor === ponto.tipo)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-bold text-green-900">{ponto.nome}</h3>
      <p className="text-sm text-green-800">{tipo ? tipo.nome : ponto.tipo}</p>
      {ponto.descricao && <p className="text-gray-700 my-1">{ponto.descricao}</p>}
      <p className="text-xs text-gray-500">
        Coordenadas: {ponto.latitude.toFixed(4)}, {ponto.longitude.toFixed(4)}
      </p>
    </div>
  )
}

export default SupportPointCard
