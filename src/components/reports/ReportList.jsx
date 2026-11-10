import RiskBadge from '../ui/RiskBadge'
import { listaStatus } from '../../utils/constantes'

function ReportList({ relatos, onEditar, onExcluir }) {
  if (relatos.length === 0) {
    return (
      <p className="bg-white rounded-lg border border-gray-200 p-4 text-gray-500">
        Nenhum relato encontrado.
      </p>
    )
  }

  // troca o valor guardado (ex: em_analise) pelo nome bonito
  function nomeDoStatus(valor) {
    const encontrado = listaStatus.find((item) => item.valor === valor)
    return encontrado ? encontrado.nome : valor
  }

  return (
    <ul className="flex flex-col gap-3">
      {relatos.map((relato) => (
        <li
          key={relato.id}
          className="bg-white rounded-lg border border-gray-200 p-4"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-green-900">{relato.titulo}</h3>
            <RiskBadge nivel={relato.nivel_atencao} />
          </div>

          <p className="text-gray-700 my-2">{relato.descricao}</p>

          <p className="text-sm text-gray-500">
            {relato.categoria} | {relato.localizacao}
          </p>
          <p className="text-sm text-gray-500">
            Status: {nomeDoStatus(relato.status)}
            {relato.criado_em &&
              ` | ${new Date(relato.criado_em).toLocaleDateString('pt-BR')}`}
          </p>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => onEditar(relato)}
              className="border border-green-800 text-green-800 px-3 py-1 rounded hover:bg-green-50"
            >
              Editar
            </button>
            <button
              onClick={() => onExcluir(relato)}
              className="border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ReportList
