// Índice experimental de exposição ao calor (0 a 100).
// NÃO é um índice médico nem oficial.
//
// Pontos por fator (máximo entre parênteses):
//   temperatura (40), umidade (15), horário (15),
//   falta de sombra (20) e falta de pontos de apoio (10).
// Sombra e pontos de apoio são opcionais: se não forem informados,
// ficam de fora e a nota é recalculada para a escala de 0 a 100.
//
// Níveis: abaixo de 35 = baixo, de 35 a 64 = atencao, 65 ou mais = alto.

export function calcularIndice({ temperatura, umidade, hora, temSombra, pontosPerto }) {
  let pontos = 0
  let maximo = 0

  // temperatura (até 40 pontos)
  maximo = maximo + 40
  if (temperatura >= 38) {
    pontos = pontos + 40
  } else if (temperatura >= 34) {
    pontos = pontos + 32
  } else if (temperatura >= 30) {
    pontos = pontos + 22
  } else if (temperatura >= 26) {
    pontos = pontos + 12
  } else if (temperatura >= 22) {
    pontos = pontos + 5
  }

  // umidade (até 15 pontos): ar muito úmido atrapalha o suor
  maximo = maximo + 15
  if (umidade >= 70) {
    pontos = pontos + 15
  } else if (umidade >= 50) {
    pontos = pontos + 8
  } else if (umidade < 30) {
    pontos = pontos + 5
  }

  // horário (até 15 pontos): o pico do sol é das 11h às 16h
  maximo = maximo + 15
  if (hora >= 11 && hora <= 16) {
    pontos = pontos + 15
  } else if ((hora >= 9 && hora <= 10) || (hora >= 17 && hora <= 18)) {
    pontos = pontos + 8
  }

  // falta de sombra (até 20 pontos), só se a informação existir
  if (temSombra !== undefined) {
    maximo = maximo + 20
    if (!temSombra) {
      pontos = pontos + 20
    }
  }

  // falta de pontos de apoio (até 10 pontos), só se a informação existir
  if (pontosPerto !== undefined) {
    maximo = maximo + 10
    if (pontosPerto === 0) {
      pontos = pontos + 10
    }
  }

  const pontuacao = Math.round((pontos / maximo) * 100)

  let nivel = 'baixo'
  if (pontuacao >= 65) {
    nivel = 'alto'
  } else if (pontuacao >= 35) {
    nivel = 'atencao'
  }

  return { pontuacao, nivel }
}
