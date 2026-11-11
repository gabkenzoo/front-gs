export const categorias = [
  'Bebedouro sem água',
  'Praça sem sombra',
  'Ponto de apoio fechado',
  'Região com calor intenso',
  'Necessidade de espaço de descanso',
]

export const niveis = [
  { valor: 'baixo', nome: 'Baixo' },
  { valor: 'atencao', nome: 'Atenção' },
  { valor: 'alto', nome: 'Alto' },
]

export const listaStatus = [
  { valor: 'aberto', nome: 'Aberto' },
  { valor: 'em_analise', nome: 'Em análise' },
  { valor: 'resolvido', nome: 'Resolvido' },
]

export const cidadePadrao = {
  nome: 'Igarapava-SP',
  latitude: -20.0386,
  longitude: -47.7475,
}

export const tiposPonto = [
  { valor: 'agua', nome: 'Fonte de água' },
  { valor: 'praca', nome: 'Praça arborizada' },
  { valor: 'parque', nome: 'Parque' },
  { valor: 'biblioteca', nome: 'Biblioteca' },
  { valor: 'centro_comunitario', nome: 'Centro comunitário' },
  { valor: 'comercio', nome: 'Comércio parceiro' },
  { valor: 'descanso', nome: 'Local de descanso' },
]

// cor de cada tipo de ponto no mapa
export const coresTipo = {
  agua: '#0284c7',
  praca: '#15803d',
  parque: '#65a30d',
  biblioteca: '#7c3aed',
  centro_comunitario: '#c2410c',
  comercio: '#be185d',
  descanso: '#475569',
}

// cor do círculo de risco no mapa
export const coresNivel = {
  baixo: '#16a34a',
  atencao: '#eab308',
  alto: '#ea580c',
}
