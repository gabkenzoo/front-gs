import { useState, useEffect } from 'react'
import { buscarClima } from '../services/weatherService'

function useWeather(latitude, longitude) {
  const [clima, setClima] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  // muda quando o usuário clica em "Tentar de novo", para buscar outra vez
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    async function carregar() {
      setCarregando(true)
      setErro('')
      try {
        const dados = await buscarClima(latitude, longitude)
        setClima(dados)
      } catch (e) {
        setErro('Não foi possível carregar o clima.')
      } finally {
        setCarregando(false)
      }
    }

    carregar()
  }, [latitude, longitude, tentativa])

  function atualizar() {
    setTentativa(tentativa + 1)
  }

  return { clima, carregando, erro, atualizar }
}

export default useWeather
