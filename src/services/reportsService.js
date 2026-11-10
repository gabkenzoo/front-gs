import { chamarApi } from './api'

// Monta só os campos que podem ser enviados (sem id nem data)
function montarCorpo(dados) {
  return {
    titulo: dados.titulo,
    descricao: dados.descricao,
    categoria: dados.categoria,
    localizacao: dados.localizacao,
    nivel_atencao: dados.nivel_atencao,
    status: dados.status,
  }
}

// READ: busca todos os relatos, os mais novos primeiro
export function listarRelatos() {
  return chamarApi('reports?select=*&order=criado_em.desc')
}

// CREATE: cadastra um relato novo
export function criarRelato(dados) {
  return chamarApi('reports', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(montarCorpo(dados)),
  })
}

// UPDATE: edita o relato que tem esse id
export function atualizarRelato(id, dados) {
  return chamarApi(`reports?id=eq.${id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(montarCorpo(dados)),
  })
}

// DELETE: exclui o relato que tem esse id
export function excluirRelato(id) {
  return chamarApi(`reports?id=eq.${id}`, {
    method: 'DELETE',
  })
}
