# AI.md — Uso de Inteligência Artificial

## 1. Ferramentas que utilizamos

Durante o desenvolvimento do SombraViva, usamos duas ferramentas de inteligência artificial para ajudar em algumas partes do projeto.

| Ferramenta | Como usamos |
|---|---|
| Claude | Ajudou a montar a estrutura do projeto, criar partes do código, configurar o Supabase, desenvolver os componentes e resolver alguns erros. |
| ChatGPT | Utilizamos para tirar dúvidas e ajudar a entender e corrigir pequenos problemas que apareceram durante o desenvolvimento. |

## 2. Como a IA participou do projeto

A IA foi utilizada em diferentes momentos, desde o planejamento até a criação de algumas funcionalidades. Não pedimos tudo de uma vez. Fomos trabalhando por partes, conforme o projeto avançava e apareciam novas necessidades.

Alguns exemplos do que pedimos:

**1. Planejamento do SombraViva**

Apresentamos a proposta do projeto e os requisitos da atividade da FIAP. Pedimos ajuda para organizar as ideias, definir as funcionalidades e escolher as tecnologias que poderíamos utilizar.

**2. Configuração inicial**

Pedimos orientações para criar o projeto com Vite, instalar as dependências e configurar o Tailwind CSS. Também recebemos ajuda para organizar as pastas e os arquivos.

**3. Git e GitHub**

Quando tivemos problemas para enviar o projeto ao GitHub, mostramos imagens do terminal e pedimos ajuda para entender os erros e descobrir quais comandos precisávamos utilizar.

**4. Desenvolvimento da interface**

Pedimos ajuda para criar os componentes da aplicação, como Navbar, Sidebar, Footer, cartões de informações e indicadores de temperatura e risco.

**5. Formulários e relatos**

Utilizamos a IA como apoio para desenvolver o formulário de ocorrências, a lista de relatos, os filtros e as validações dos campos.

**6. Integração com Supabase**

Pedimos explicações sobre como configurar o banco de dados e criar as funções para cadastrar, consultar, editar e excluir os relatos dos cidadãos.

**7. Temperatura e umidade**

Solicitamos ajuda para integrar a API Open-Meteo e mostrar os dados meteorológicos na aplicação. Também trabalhamos na classificação dos níveis de atenção ao calor.

**8. Mapa e pontos de apoio**

A IA ajudou na implementação do mapa com Leaflet, no cadastro dos pontos de apoio e na criação da ideia da Rota Fresca.

**9. Documentação**

Também utilizamos as ferramentas para organizar as informações do README.md e deste arquivo.

## 3. Partes do projeto que tiveram ajuda da IA

Durante a programação, utilizamos sugestões e códigos gerados com auxílio das ferramentas para desenvolver algumas partes da aplicação.

**Componentes criados com esse auxílio:**
- Navbar
- Sidebar
- Footer
- DashboardCard
- TemperatureCard
- RiskBadge
- ReportForm
- ReportList
- HeatMap
- RouteMap
- SupportPointCard
- PointForm

**Hooks:**
- `useWeather`
- `useReports`
- `usePoints`

**Arquivos de serviços:**
- `api.js`
- `reportsService.js`
- `pointsService.js`
- `weatherService.js`

**Outras funções:**
- `heatIndex.js`
- `rotaFresca.js`
- `validacao.js`

A IA também ajudou a separar melhor os arquivos, deixando os componentes visuais em uma pasta, os hooks em outra e as chamadas das APIs nos serviços.

Uma das sugestões que aproveitamos foi a Rota Fresca. Como não temos informações reais sobre a quantidade de sombra em cada rua, ela foi desenvolvida como uma simulação utilizando a distância entre os pontos. Por isso, não apresentamos o resultado como uma rota realmente otimizada contra o calor.

## 4. Testes que realizamos

Os códigos sugeridos pela IA precisaram ser colocados no projeto e testados. Durante esse processo, encontramos alguns erros e fizemos alterações até conseguir utilizar as funcionalidades.

| Parte testada | O que fizemos | Resultado |
|---|---|---|
| Inicialização do projeto | Executamos `npm run dev` e abrimos a aplicação no navegador. | Funcionou |
| Tailwind CSS | Conferimos a aplicação e os estilos na tela. | Funcionou |
| Navegação | Clicamos nos links do menu para verificar se as páginas abriam. | Funcionou |
| Cadastro de relatos | Criamos um relato pelo formulário e verificamos se apareceu no Supabase. | Funcionou |
| Consulta de relatos | Atualizamos a página e verificamos se o relato continuava salvo. | Funcionou |
| Edição de relatos | Alteramos um registro e conferimos a mudança no banco de dados. | Funcionou |
| Exclusão de relatos | Excluímos um registro e verificamos se ele foi removido do Supabase. | Funcionou |
| Dados meteorológicos | Comparamos os dados de temperatura e umidade com outro serviço de previsão. | Funcionou |
| Pontos de apoio | Cadastramos pontos e conferimos os registros no Supabase. | Funcionou |
| Rota Fresca | Informamos origem e destino e verificamos a distância apresentada. | Funcionou |
| Validação dos formulários | Tentamos enviar os formulários vazios para conferir as mensagens de erro. | Funcionou |
| Tratamento de erros | Ainda precisamos conferir todos os casos de erro da aplicação. | Em revisão |
| Deploy | O projeto ainda não foi publicado. | Pendente |

## 5. Problemas que encontramos durante o desenvolvimento

Nem tudo funcionou de primeira. Tivemos alguns problemas durante a programação e precisamos voltar aos arquivos para corrigir.

**Problemas com Git:** no começo, fizemos alguns commits na pasta errada. Isso acabou deixando os arquivos organizados de uma forma que não queríamos no GitHub. Tivemos que reorganizar o projeto e configurar o repositório novamente.

**Endereço do repositório:** também tivemos problemas com o endereço configurado no `origin`. Tentamos enviar os arquivos para um repositório que não existia e, em outro momento, acabamos utilizando o endereço antigo. Depois corrigimos essa configuração.

**Configuração do Supabase:** apareceram nomes de variáveis de ambiente voltados para Next.js, mas nosso projeto utiliza Vite. Por isso, tivemos que adaptar os nomes para começar com `VITE_`.

**Arquivo ReportList.jsx:** em determinado momento, um componente estava sendo importado, mas o arquivo ainda não tinha sido criado. Isso fez o Vite apresentar um erro. Resolvemos criando o arquivo que estava faltando.

**Erro no validacao.js:** algumas funções acabaram sendo exportadas duas vezes, causando o erro `Duplicated export`. Foi necessário revisar o arquivo e corrigir o código.

**Limitações de algumas funcionalidades:** durante o desenvolvimento, percebemos que nem todas as ideias poderiam ser implementadas com os dados que temos. O índice de exposição utiliza temperatura, umidade e horário. Já a Rota Fresca trabalha com uma simulação de distância em linha reta, e o HeatMap ainda não representa um mapa de calor real.

## 6. O que achamos do uso da IA

A inteligência artificial ajudou bastante durante o desenvolvimento, principalmente em partes que ainda estamos aprendendo, como React, hooks, integração com APIs e configuração do banco de dados.

Com ela, conseguimos entender melhor alguns erros e avançar em partes do código que tivemos dificuldade para fazer sozinhos.

Mesmo assim, percebemos que nem todas as respostas funcionam perfeitamente. Em alguns momentos, os códigos apresentaram erros ou precisaram ser adaptados para funcionar no nosso projeto.

Por isso, tivemos que testar as funcionalidades, conferir os dados no Supabase e fazer alterações quando necessário.

No final, a IA serviu como uma ferramenta de apoio para o desenvolvimento do SombraViva, mas também precisamos acompanhar o que estava sendo feito e entender como cada parte da aplicação funciona.
