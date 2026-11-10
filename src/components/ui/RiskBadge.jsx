// Mostra o nível de atenção com uma cor: baixo, atencao ou alto
function RiskBadge({ nivel }) {
  const estilos = {
    baixo: 'bg-green-100 text-green-800',
    atencao: 'bg-yellow-100 text-yellow-800',
    alto: 'bg-orange-100 text-orange-800',
  }

  const nomes = {
    baixo: 'Baixo',
    atencao: 'Atenção',
    alto: 'Alto',
  }

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${estilos[nivel]}`}
    >
      {nomes[nivel]}
    </span>
  )
}

export default RiskBadge