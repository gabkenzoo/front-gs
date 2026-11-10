import { useState, useEffect } from 'react'
import {
  listarRelatos,
  criarRelato,
  atualizarRelato,
  excluirRelato,
} from '../services/reportsService'

function useReports() {
  const [relatos, setRelatos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // busca os relatos na API quando o hook é usado pela primeira vez
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarRelatos()
        setRelatos(dados)
      } catch (e) {
        setErro(e.message)
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [])

  async function criar(dados) {
    const [novo] = await criarRelato(dados)
    setRelatos([novo, ...relatos])
  }

  async function atualizar(id, dados) {
    const [atualizado] = await atualizarRelato(id, dados)
    setRelatos(relatos.map((relato) => (relato.id === id ? atualizado : relato)))
  }

  async function excluir(id) {
    await excluirRelato(id)
    setRelatos(relatos.filter((relato) => relato.id !== id))
  }

  return { relatos, carregando, erro, criar, atualizar, excluir }
}

export default useReports
