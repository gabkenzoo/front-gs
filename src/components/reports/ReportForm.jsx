import { useState, useEffect } from 'react'
import { categorias, niveis, listaStatus } from '../../utils/constantes'
import { validarRelato } from '../../utils/validacao'

const formularioVazio = {
  titulo: '',
  descricao: '',
  categoria: '',
  localizacao: '',
  nivel_atencao: 'atencao',
  status: 'aberto',
}

function ReportForm({ relatoEditando, onSalvar, onCancelar }) {
  const [dados, setDados] = useState(formularioVazio)
  const [erros, setErros] = useState({})

  // quando clica em editar, preenche o formulário com o relato escolhido
  useEffect(() => {
    if (relatoEditando) {
      setDados(relatoEditando)
    } else {
      setDados(formularioVazio)
    }
    setErros({})
  }, [relatoEditando])

  // atualiza o campo que foi digitado
  function mudarCampo(evento) {
    setDados({ ...dados, [evento.target.name]: evento.target.value })
  }

  async function enviar(evento) {
    evento.preventDefault()

    const errosEncontrados = validarRelato(dados)
    if (Object.keys(errosEncontrados).length > 0) {
      setErros(errosEncontrados)
      return
    }

    // onSalvar devolve true se a API salvou, e false se deu erro
    const deuCerto = await onSalvar(dados)

    // se era um relato novo e deu certo, limpa o formulário
    if (deuCerto && !relatoEditando) {
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
      <h2 className="font-bold text-green-900">
        {relatoEditando ? 'Editar relato' : 'Novo relato'}
      </h2>

      <div>
        <label htmlFor="titulo" className="block text-sm text-gray-700">
          Título
        </label>
        <input
          id="titulo"
          name="titulo"
          value={dados.titulo}
          onChange={mudarCampo}
          className={classeCampo}
        />
        {erros.titulo && <p className="text-sm text-red-600">{erros.titulo}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm text-gray-700">
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          rows="3"
          value={dados.descricao}
          onChange={mudarCampo}
          className={classeCampo}
        />
        {erros.descricao && (
          <p className="text-sm text-red-600">{erros.descricao}</p>
        )}
      </div>

      <div>
        <label htmlFor="categoria" className="block text-sm text-gray-700">
          Categoria
        </label>
        <select
          id="categoria"
          name="categoria"
          value={dados.categoria}
          onChange={mudarCampo}
          className={classeCampo}
        >
          <option value="">Escolha uma categoria</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        {erros.categoria && (
          <p className="text-sm text-red-600">{erros.categoria}</p>
        )}
      </div>

      <div>
        <label htmlFor="localizacao" className="block text-sm text-gray-700">
          Localização
        </label>
        <input
          id="localizacao"
          name="localizacao"
          placeholder="Ex: Praça da Matriz"
          value={dados.localizacao}
          onChange={mudarCampo}
          className={classeCampo}
        />
        {erros.localizacao && (
          <p className="text-sm text-red-600">{erros.localizacao}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="nivel_atencao" className="block text-sm text-gray-700">
            Nível de atenção
          </label>
          <select
            id="nivel_atencao"
            name="nivel_atencao"
            value={dados.nivel_atencao}
            onChange={mudarCampo}
            className={classeCampo}
          >
            {niveis.map((nivel) => (
              <option key={nivel.valor} value={nivel.valor}>
                {nivel.nome}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={dados.status}
            onChange={mudarCampo}
            className={classeCampo}
          >
            {listaStatus.map((item) => (
              <option key={item.valor} value={item.valor}>
                {item.nome}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
        >
          {relatoEditando ? 'Salvar alterações' : 'Enviar relato'}
        </button>
        {relatoEditando && (
          <button
            type="button"
            onClick={onCancelar}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default ReportForm