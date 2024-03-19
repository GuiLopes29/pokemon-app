# Projeto Pokédex

Este projeto é uma implementação de uma Pokédex, uma enciclopédia virtual de Pokémon. Ele permite que os usuários visualizem informações detalhadas sobre diferentes Pokémon, incluindo seus tipos, estatísticas e evoluções.

## Funcionalidades

- **Filtro de Tipo**: Os usuários podem filtrar Pokémon por tipo usando o componente `TypeFilter`. Este componente faz uma chamada à API para buscar todos os tipos de Pokémon disponíveis e os exibe em um menu suspenso. Quando um tipo é selecionado, a lista de Pokémon é filtrada para incluir apenas Pokémon desse tipo.

<!-- - **Barra de Busca**: Os usuários podem buscar Pokémon pelo nome usando a barra de busca. Quando o usuário digita um nome na barra de busca e pressiona `Enter` ou clica no botão de busca, a lista de Pokémon é filtrada para incluir apenas o Pokémon cujo nome corresponde ao valor da busca. -->

- **Detalhes do Pokémon**: Quando um Pokémon é selecionado, alguns dos detalhes desse Pokémon são exibidos em um modal. Isso inclui o nome do Pokémon, uma imagem do Pokémon, os tipos do Pokémon e as estatísticas do Pokémon. As estatísticas são exibidas como barras verticais com cores distintas.

## Implementação

O projeto é implementado usando React e styled-components. A API do Pokémon é usada para buscar as informações do Pokémon.

Os principais componentes do projeto são:

- `App`: Este é o componente principal do projeto. Ele gerencia o estado do filtro <!--e da busca--> e renderiza os componentes `TypeFilter`, <!--`SearchBar` --> e `PokemonList`.

- `TypeFilter`: Este componente renderiza um menu suspenso com todos os tipos de Pokémon disponíveis. Quando um tipo é selecionado, ele chama a função `onFilterChange` passada pelas props para atualizar o estado do filtro no componente `App`.

<!-- - `SearchBar`: Este componente renderiza uma barra de busca e um botão de busca. Quando o usuário digita na barra de busca e pressiona `Enter` ou clica no botão de busca, ele chama a função `onSearchClick` passada pelas props para atualizar o estado do filtro no componente `App` com o valor da busca. -->

- `PokemonList`: Este componente busca a lista de todos os Pokémon da API do Pokémon e os renderiza em uma lista. Ele usa o valor do filtro passado pelas props para filtrar a lista de Pokémon.

- `PokemonDetails`: Este componente é renderizado quando um Pokémon é selecionado. Ele busca os detalhes do Pokémon selecionado da API do Pokémon e os exibe em um modal.

## Próximos Passos (Segunda-feira 18/03)

- [X] Implementar um sistema de autenticação de usuários.
- [ ] Implementar um sistema de troca de Pokémon entre usuários.
- [X] Adicionar mais detalhes e informações sobre os Pokémon. **(Melhorando o CSS)**
- [ ] Implimentar sistema para captura de pokemons **(Em andamento, finalização 19/03)**
