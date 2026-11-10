import { useState, useEffect } from 'react'
import { listarPontos, criarPonto } from '../services/pointsService'

function usePoints() {
  const [pontos, setPontos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  // busca os pontos na API quando o hook é usado pela primeira vez
  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarPontos()
        setPontos(dados)
      } catch (e) {
        setErro(e.message)
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [])

  async function criar(dados) {
    const [novo] = await criarPonto(dados)
    setPontos([novo, ...pontos])
  }

  return { pontos, carregando, erro, criar }
}

export default usePoints
