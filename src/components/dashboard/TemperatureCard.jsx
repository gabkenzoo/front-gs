import RiskBadge from '../ui/RiskBadge'

// Mostra a temperatura, a umidade e o nível de atenção
function TemperatureCard({ cidade, temperatura, umidade, nivel }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm text-gray-500">Agora em {cidade}</h3>
      <p className="text-4xl font-bold text-green-900">{temperatura}°C</p>
      <p className="text-gray-700">Umidade do ar: {umidade}%</p>
      <div className="mt-3">
        <span className="text-sm text-gray-500 mr-2">Nível de atenção:</span>
        <RiskBadge nivel={nivel} />
      </div>
    </div>
  )
}

export default TemperatureCard