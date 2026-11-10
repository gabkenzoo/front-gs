// Cartão de indicador: título, valor grande e uma descrição pequena
function DashboardCard({ titulo, valor, descricao }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm text-gray-500">{titulo}</h3>
      <p className="text-3xl font-bold text-green-900">{valor}</p>
      <p className="text-xs text-gray-500">{descricao}</p>
    </div>
  )
}

export default DashboardCard