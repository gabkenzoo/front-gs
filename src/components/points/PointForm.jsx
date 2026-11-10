import { useState } from 'react'
import { tiposPonto } from '../../utils/constantes'
import { validarPonto } from '../../utils/validacao'

const formularioVazio = {
  nome: '',
  tipo: '',
  descricao: '',
}

function PointForm({ posicao, onSalvar }) {
  const [dados, setDados] = useState(formularioVazio)
  const [erros, setErros] = useState({})

  function mudarCampo(evento) {
    setDados({ ...dados, [evento.target.name]: evento.target.value })
  }

  async function enviar(evento) {
    evento.preventDefault()

    const errosEncontrados = validarPonto(dados, posicao)
    if (Object.keys(errosEncontrados).length > 0) {
      setErros(errosEncontrados)
      return
    }

    // onSalvar devolve true se a API salvou, e false se deu erro
    const deuCerto = await onSalvar({
      ...dados,
      latitude: posicao.latitude,
      longitude: posicao.longitude,
    })

    if (deuCerto) {
      setDados(formularioVazio)
    }
    setErros({})
  }

  const classeCampo =
    'w-full border border-gray-300 rounded p-2 focus:outline-none focus:border-green-700'

  return (
    <form
      onSubmit={enviar}
      className="bg-white rounded-lg border border-gray-200 p-4 flex flex-col gap-3"
    >
      <h2 className="font-bold text-green-900">Cadastrar ponto de apoio</h2>

      <div>
        <label htmlFor="nome" className="block text-sm text-gray-700">
          Nome do local
        </label>
        <input
          id="nome"
          name="nome"
          value={dados.nome}
          onChange={mudarCampo}
          className={classeCampo}
        />
        {erros.nome && <p className="text-sm text-red-600">{erros.nome}</p>}
      </div>

      <div>
        <label htmlFor="tipo" className="block text-sm text-gray-700">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          value={dados.tipo}
          onChange={mudarCampo}
          className={classeCampo}
        >
          <option value="">Escolha o tipo</option>
          {tiposPonto.map((tipo) => (
            <option key={tipo.valor} value={tipo.valor}>
              {tipo.nome}
            </option>
          ))}
        </select>
        {erros.tipo && <p className="text-sm text-red-600">{erros.tipo}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm text-gray-700">
          Descrição (opcional)
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows="2"
          value={dados.descricao}
          onChange={mudarCampo}
          className={classeCampo}
        />
      </div>

      <div>
        <p className="text-sm text-gray-700">
          Local escolhido:{' '}
          {posicao
            ? `${posicao.latitude.toFixed(4)}, ${posicao.longitude.toFixed(4)}`
            : 'nenhum ainda'}
        </p>
        {erros.posicao && <p className="text-sm text-red-600">{erros.posicao}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        Cadastrar ponto
      </button>
    </form>
  )
}

export default PointForm
