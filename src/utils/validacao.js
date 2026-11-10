export function validarRelato(dados) {
  const erros = {}

  if (dados.titulo.trim().length < 3) {
    erros.titulo = 'O título precisa ter pelo menos 3 letras.'
  }
  if (dados.descricao.trim().length < 10) {
    erros.descricao = 'A descrição precisa ter pelo menos 10 letras.'
  }
  if (dados.categoria === '') {
    erros.categoria = 'Escolha uma categoria.'
  }
  if (dados.localizacao.trim() === '') {
    erros.localizacao = 'Informe onde fica o problema.'
  }

  return erros
}