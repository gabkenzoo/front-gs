import { chamarApi } from './api'

// READ: busca todos os pontos de apoio, os mais novos primeiro
export function listarPontos() {
  return chamarApi('points?select=*&order=criado_em.desc')
}

// CREATE: cadastra um ponto de apoio novo
export function criarPonto(dados) {
  return chamarApi('points', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({
      nome: dados.nome,
      tipo: dados.tipo,
      descricao: dados.descricao,
      latitude: dados.latitude,
      longitude: dados.longitude,
    }),
  })
}
