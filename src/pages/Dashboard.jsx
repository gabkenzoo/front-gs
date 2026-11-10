import DashboardCard from '../components/dashboard/DashboardCard'
import TemperatureCard from '../components/dashboard/TemperatureCard'

function Dashboard() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-green-900">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">
        Os indicadores ainda não estão ligados à API.
      </p>

      <div className="mb-4">
        <TemperatureCard
          cidade="Igarapava-SP"
          temperatura={0}
          umidade={0}
          nivel="baixo"
        />
        <p className="text-xs text-gray-500 mt-1">
          Valores de teste, não são dados reais.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DashboardCard
          titulo="Pontos de apoio"
          valor="--"
          descricao="Cadastrados na plataforma"
        />
        <DashboardCard
          titulo="Fontes de água"
          valor="--"
          descricao="Bebedouros cadastrados"
        />
        <DashboardCard
          titulo="Relatos da comunidade"
          valor="--"
          descricao="Ocorrências registradas"
        />
      </div>
    </main>
  )
}

export default Dashboard