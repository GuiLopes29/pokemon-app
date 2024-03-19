# Projeto Pokédex

Este projeto é uma implementação de uma Pokédex, uma enciclopédia virtual de Pokémon. Ele permite que os usuários visualizem informações detalhadas sobre diferentes Pokémon, incluindo seus tipos e estatísticas

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

## Detalhes da aplicação
### Tela de login:
![login 1](https://github.com/GuiLopes29/pokemon-app/assets/33187657/923de04a-ad4c-47dc-80e0-800b8410efba)
### Senha incorreta ou falta de dados:
![login 2](https://github.com/GuiLopes29/pokemon-app/assets/33187657/6743e82c-ba63-472e-b6ce-a41569838423)
### Invalidação de token após 1 hora:
![validador de token expirado](https://github.com/GuiLopes29/pokemon-app/assets/33187657/1b78656d-fec4-4bc5-b945-08f6035ea5a3)
<br> <br>
### Pagina Inicial:
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/9097b134-4826-4a4b-85ba-51260542570c)
### Filtro por tipo:
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/d9a6c065-3fae-4eb9-a8da-e292e277a5cc)

### Captura de pokemon falhou:
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/04ffc39e-8112-4eb4-a60c-b19cfa36e96b)
### Pokemon capturado:
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/87dcaf11-cbb7-4f26-911e-740200d67f4e)

### Pokedex:
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/3f86d160-18d8-443a-9bb9-10dd9a7a7617)
### Sistema de troca entre treinadores: **EM ANDAMENTO**
![image](https://github.com/GuiLopes29/pokemon-app/assets/33187657/14bf75b0-9065-4b4b-94e5-3f0c814bed73)

<br> <br> <br>

## Informações sobre a aplicação:

1º Conforme descer a tela de pokemons e pokedex, continuará buscando continuamente os próximos pokemons (de acordo com a api). <br>
2º A taxa de captura dos pokemons é aleatória, atualmente está com uma dificuldade alta para não sobrecarregar a pokedex com diversos pokemons. <br>
3º O filtro por tipo, possui um bug que quando chega no fim dos pokemons daquele tipo, passa a buscar normalmente os pokemons. <br>
4º A aplicação possui responsividade, porém conforme for, pode surgir algum bug. <br>

## Próximos Passos (Segunda-feira 18/03)

- [X] Implementar um sistema de autenticação de usuários.
- [X] Adicionar mais detalhes e informações sobre os Pokémon.
- [x] Implimentar sistema para captura de pokemons.
## Passos finais *(19/03)*
- [ ] Implementar um sistema de troca de Pokémon entre usuários. (talvez não seja finalizado)

