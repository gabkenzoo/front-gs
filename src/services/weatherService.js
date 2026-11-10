// Busca a temperatura e a umidade atuais na API do Open-Meteo
export async function buscarClima(latitude, longitude) {
  const endereco =
    'https://api.open-meteo.com/v1/forecast' +
    `?latitude=${latitude}&longitude=${longitude}` +
    '&current=temperature_2m,relative_humidity_2m' +
    '&timezone=America%2FSao_Paulo'

  const resposta = await fetch(endereco)

  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao consultar o clima`)
  }

  const dados = await resposta.json()

  return {
    temperatura: dados.current.temperature_2m,
    umidade: dados.current.relative_humidity_2m,
  }
}
