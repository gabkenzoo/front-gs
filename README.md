# SombraViva

Inteligência urbana contra o calor extremo.

Projeto da Global Solution 2026 (FIAP), de Front-end Design e Web Development.

## Descrição

O SombraViva é uma aplicação web que ajuda as pessoas a se protegerem do calor nas cidades. Ela mostra o clima atual de Igarapava-SP, um nível de atenção ao calor, um mapa com pontos de apoio (fontes de água, praças, bibliotecas etc.) e permite que a comunidade registre relatos de problemas.

## Problema que queremos resolver

Muita gente passa horas na rua trabalhando, estudando ou se deslocando e não sabe onde encontrar sombra, água potável ou um lugar para descansar nos dias de calor intenso.

## Objetivo

Reunir em um só lugar informações do clima, pontos de apoio e relatos da comunidade, para ajudar o cidadão a tomar decisões melhores em dias de calor.

## Público-alvo

Entregadores e trabalhadores que ficam muito tempo na rua, idosos, estudantes, comerciantes, pessoas que trabalham ao ar livre e qualquer cidadão exposto ao calor urbano.

## Funcionalidades

- **Dashboard:** temperatura e umidade atuais (Open-Meteo), nível de atenção ao calor, indicadores vindos da API (pontos de apoio, fontes de água, relatos) e recomendações de proteção.
- **Mapa:** mapa interativo (Leaflet e OpenStreetMap) com os pontos de apoio, filtro por tipo e cadastro de novos pontos clicando no mapa.
- **Rota Fresca (simulação):** o usuário marca origem e destino no mapa, o app desenha uma linha reta entre eles e lista os pontos de apoio cadastrados perto dessa linha.
- **Ocorrências:** CRUD completo de relatos da comunidade (cadastrar, listar, editar e excluir), com filtros por categoria e status e validação do formulário.
- **Informações:** explica o projeto, o problema, o público e o impacto esperado.
- Estados de carregamento, erro, lista vazia e sucesso nas telas que usam API.

## Limitações conhecidas

- A **Rota Fresca é uma simulação**. A linha é reta, não segue as ruas, e não usamos dados reais de sombra por rua.
- O **nível de atenção vale para a cidade inteira**. Ele não separa bairros.
- O componente `HeatMap` é um mapa de pontos com um círculo colorido do nível de atenção, não um mapa de calor real por região.
- O índice usa só temperatura, umidade e horário. Sombra, áreas verdes e pontos de apoio perto estão previstos na função, mas ainda não são alimentados pela aplicação.
- Os pontos de apoio podem ser cadastrados e consultados, mas **não editados nem excluídos** pela aplicação.
- As permissões do banco (RLS) deixam qualquer pessoa com a chave pública ler, criar, editar e excluir relatos. Serve para o trabalho acadêmico, mas não seria seguro em produção, onde seria preciso login.
- O plano gratuito do Supabase pode pausar o projeto depois de alguns dias sem uso.

## Índice de exposição ao calor

É um índice **experimental criado pela equipe. Não é um índice médico nem oficial** e não serve como diagnóstico. A pontuação vai de 0 a 100 e fica em `src/utils/heatIndex.js`.

| Fator | Pontos máximos | Como pontua |
|---|---|---|
| Temperatura | 40 | 38 °C ou mais = 40, 34 a 37 = 32, 30 a 33 = 22, 26 a 29 = 12, 22 a 25 = 5 |
| Umidade | 15 | 70% ou mais = 15, 50 a 69% = 8, abaixo de 30% = 5 |
| Horário | 15 | 11h às 16h = 15, 9h às 10h e 17h às 18h = 8 |
| Falta de sombra | 20 | Opcional, ainda não alimentado |
| Falta de pontos de apoio | 10 | Opcional, ainda não alimentado |

Fatores não informados ficam de fora e a nota é recalculada para a escala de 0 a 100. Os níveis são: **Baixo** abaixo de 35, **Atenção** de 35 a 64 e **Alto** a partir de 65. Esses limites foram escolhidos pela equipe, sem base em norma.

## Tecnologias utilizadas

- React e Vite (JavaScript)
- Tailwind CSS
- React Router (`react-router-dom`)
- Leaflet e `react-leaflet` com OpenStreetMap
- Open-Meteo (API de clima, sem chave)
- Supabase (API REST, para o CRUD)
- Git e GitHub

## Estrutura de pastas

```
src/
  components/
    layout/      Navbar, Sidebar, Footer
    dashboard/   DashboardCard, TemperatureCard
    map/         HeatMap, RouteMap
    points/      SupportPointCard, PointForm
    reports/     ReportForm, ReportList
    ui/          RiskBadge
  pages/         Dashboard, Mapa, RotaFresca, Ocorrencias, Informacoes
  hooks/         useWeather, useReports, usePoints
  services/      api.js, reportsService.js, pointsService.js, weatherService.js
  utils/         heatIndex.js, rotaFresca.js, validacao.js, constantes.js
  App.jsx
  main.jsx
  index.css
```

- **components:** parte visual, só recebe dados e mostra na tela.
- **hooks:** lógica de estado e busca de dados.
- **services:** todas as chamadas de API. Nenhum componente chama `fetch` direto.
- **utils:** funções auxiliares (cálculo do índice, validação, distâncias, listas de constantes).

## Pré-requisitos

- Node.js 20 ou mais
- Git
- Uma conta no Supabase

## Instalação

```bash
git clone https://github.com/gabkenzoo/front-gs.git
cd front-gs
npm install
```

## Configuração do .env

NEXT_PUBLIC_SUPABASE_URL=https://pcmqfhmlbgbdlzunotmf.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_Ve3vAG5Ewlpp3sn5uddOtw_0Co7DZwH



## Banco de dados (Supabase)

No **SQL Editor** do Supabase, rode:

```sql
create table if not exists reports (
  id bigint generated always as identity primary key,
  titulo text not null,
  descricao text not null,
  categoria text not null,
  localizacao text not null,
  nivel_atencao text not null default 'atencao',
  status text not null default 'aberto',
  criado_em timestamptz not null default now()
);

create table if not exists points (
  id bigint generated always as identity primary key,
  nome text not null,
  tipo text not null,
  descricao text,
  latitude double precision not null,
  longitude double precision not null,
  criado_em timestamptz not null default now()
);

alter table reports enable row level security;
alter table points enable row level security;

drop policy if exists "leitura publica" on reports;
drop policy if exists "insercao publica" on reports;
drop policy if exists "edicao publica" on reports;
drop policy if exists "exclusao publica" on reports;
drop policy if exists "leitura publica pontos" on points;
drop policy if exists "insercao publica pontos" on points;

create policy "leitura publica" on reports for select to anon using (true);
create policy "insercao publica" on reports for insert to anon with check (true);
create policy "edicao publica" on reports for update to anon using (true) with check (true);
create policy "exclusao publica" on reports for delete to anon using (true);
create policy "leitura publica pontos" on points for select to anon using (true);
create policy "insercao publica pontos" on points for insert to anon with check (true);
```

## Como executar localmente

```bash
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:5173`). Depois de mudar o `.env`, reinicie o servidor.

## Como testar o CRUD

Na página **Ocorrências**, com o Table Editor do Supabase aberto ao lado:

1. **Create:** preencha o formulário e envie. O relato aparece na lista e uma linha nova aparece na tabela `reports`.
2. **Read:** recarregue a página (F5). O relato continua na lista, porque vem da API.
3. **Update:** clique em Editar, mude o título e salve. A lista e a tabela mudam.
4. **Delete:** clique em Excluir e confirme. O relato some da lista e da tabela.

Para os pontos de apoio, na página **Mapa**: clique no mapa para escolher o local, preencha nome e tipo e cadastre. O ponto aparece no mapa e na tabela `points`.

## Deploy

Link do deploy: ainda não publicado

## Repositório

GitHub: https://github.com/gabkenzoo/front-gs

## Integrantes

- Gabriel Kenzo (RM 569780)
- Enzo Leme (RM 572148)

## Uso de inteligência artificial

O uso de IA durante o desenvolvimento está documentado no arquivo [AI.md](AI.md).
