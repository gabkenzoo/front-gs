// Funções da Rota Fresca (simulação simples, sem dados reais de sombra).
// A "rota" é uma linha reta entre origem e destino. Não segue as ruas.

const RAIO_TERRA = 6371000 // em metros

function paraRadianos(graus) {
  return (graus * Math.PI) / 180
}

// distância em metros entre dois pontos do mapa (fórmula de Haversine)
export function distanciaEmMetros(a, b) {
  const dLat = paraRadianos(b.latitude - a.latitude)
  const dLng = paraRadianos(b.longitude - a.longitude)
  const lat1 = paraRadianos(a.latitude)
  const lat2 = paraRadianos(b.latitude)

  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2)

  return 2 * RAIO_TERRA * Math.asin(Math.sqrt(h))
}

// distância em metros de um ponto até a linha entre origem e destino.
// Converte graus em metros de um jeito simples, que serve para distâncias curtas.
export function distanciaAteLinha(ponto, origem, destino) {
  const metrosPorGrauLat = 111320
  const metrosPorGrauLng = 111320 * Math.cos(paraRadianos(origem.latitude))

  const px = (ponto.longitude - origem.longitude) * metrosPorGrauLng
  const py = (ponto.latitude - origem.latitude) * metrosPorGrauLat
  const dx = (destino.longitude - origem.longitude) * metrosPorGrauLng
  const dy = (destino.latitude - origem.latitude) * metrosPorGrauLat

  const tamanho = dx * dx + dy * dy

  // t diz em que parte da linha está o ponto mais próximo (0 = origem, 1 = destino)
  let t = 0
  if (tamanho > 0) {
    t = (px * dx + py * dy) / tamanho
    if (t < 0) {
      t = 0
    }
    if (t > 1) {
      t = 1
    }
  }

  const mx = dx * t
  const my = dy * t

  return Math.sqrt((px - mx) * (px - mx) + (py - my) * (py - my))
}

// pontos de apoio que ficam até "raio" metros da linha, do mais perto ao mais longe
export function pontosPertoDaLinha(pontos, origem, destino, raio) {
  return pontos
    .map((ponto) => ({
      ...ponto,
      distancia: Math.round(distanciaAteLinha(ponto, origem, destino)),
    }))
    .filter((ponto) => ponto.distancia <= raio)
    .sort((a, b) => a.distancia - b.distancia)
}
