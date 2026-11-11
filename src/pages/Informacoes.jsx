function Informacoes() {
  return (
    <main className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-green-900 mb-4">Informações</h1>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">O que é o SombraViva</h2>
        <p className="text-gray-700">
          O SombraViva é uma plataforma web que usa dados do clima e a
          participação das pessoas para ajudar a se proteger do calor extremo
          nas cidades. Este projeto foi feito para a Global Solution 2026 da FIAP.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">Qual problema resolve</h2>
        <p className="text-gray-700">
          Muita gente passa horas na rua trabalhando, estudando ou se deslocando
          e não sabe onde encontrar sombra, água ou um lugar para descansar nos
          dias de calor intenso. O SombraViva reúne essas informações em um só
          lugar.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">Como funciona</h2>
        <ul className="list-disc pl-5 text-gray-700 flex flex-col gap-1">
          <li>
            O Dashboard mostra a temperatura e a umidade atuais, vindas da API
            Open-Meteo, e um nível de atenção ao calor.
          </li>
          <li>
            O Mapa mostra os pontos de apoio cadastrados pelas pessoas, como
            fontes de água, praças e bibliotecas.
          </li>
          <li>
            Em Ocorrências, qualquer pessoa pode registrar, consultar, editar e
            excluir relatos, como um bebedouro sem água.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">Sobre o nível de atenção</h2>
        <p className="text-gray-700">
          O nível de atenção vem de uma pontuação de 0 a 100 criada pela nossa
          equipe. Ela usa temperatura, umidade e horário. Abaixo de 35 pontos o
          nível é Baixo, de 35 a 64 é Atenção e a partir de 65 é Alto. Esses
          limites foram escolhidos por nós e não vêm de nenhuma norma.
        </p>
        <p className="text-gray-700 mt-2">
          Importante: é um índice experimental. Não é um diagnóstico médico nem
          um índice oficial. O nível vale para a cidade inteira e não separa
          bairros, porque ainda não usamos dados de sombra por rua. Em caso de
          mal-estar, procure atendimento médico.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">Quem queremos ajudar</h2>
        <p className="text-gray-700">
          Entregadores e trabalhadores que ficam muito tempo na rua, idosos,
          estudantes que caminham até a escola ou faculdade, comerciantes e
          qualquer pessoa exposta ao calor urbano.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="font-bold text-green-900">Impacto social esperado</h2>
        <p className="text-gray-700">
          Esperamos que as pessoas consigam planejar melhor o dia em épocas de
          calor, encontrando mais rápido um local de apoio, e que os relatos
          ajudem a mostrar onde faltam bebedouros, sombra e espaços de descanso.
          Ainda não medimos esse impacto, ele é um objetivo do projeto.
        </p>
      </section>

      <section>
        <h2 className="font-bold text-green-900">Equipe</h2>
        <p className="text-gray-700">
          Gabriel Kenzo (RM 569780) e Enzo Leme (RM 572148).
        </p>
      </section>
    </main>
  )
}

export default Informacoes
