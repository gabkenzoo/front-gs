const URL_BASE = import.meta.env.VITE_SUPABASE_URL
const CHAVE = import.meta.env.VITE_SUPABASE_ANON_KEY

// Faz a chamada para a API do Supabase e devolve o resultado em JSON
export async function chamarApi(caminho, opcoes = {}) {
  if (!URL_BASE || !CHAVE) {
    throw new Error('Configure o arquivo .env com a URL e a chave do Supabase.')
  }

  const resposta = await fetch(`${URL_BASE}/rest/v1/${caminho}`, {
    ...opcoes,
    headers: {
      apikey: CHAVE,
      'Content-Type': 'application/json',
      ...opcoes.headers,
    },
  })

  if (!resposta.ok) {
    const texto = await resposta.text()
    throw new Error(`Erro ${resposta.status}: ${texto}`)
  }

  // o DELETE não devolve conteúdo
  if (resposta.status === 204) {
    return null
  }

  return resposta.json()
}
