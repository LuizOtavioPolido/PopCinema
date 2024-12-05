# PopCinema 🎬

PopCinema é um aplicativo móvel para explorar filmes. Utilizando a API do **The Movie Database (TMDb)**

## 🚀 Funcionalidades

- **Busca**: Procure filmes.
- **Detalhes de Filmes**: Veja os detalhes dos filmes.
- **Lista de favoritos**: Guarde seus filmes preferidos.

## 🛠️ Tecnologias Utilizadas

O PopCinema foi desenvolvido com as seguintes ferramentas e bibliotecas:

- **[React Native](https://reactnative.dev/)**: Framework para desenvolvimento mobile.
- **[Expo](https://expo.dev/)**: Plataforma para agilizar o desenvolvimento e deploy.
- **[React Query](https://tanstack.com/query)**: Gerenciamento de dados assíncronos.
- **[Axios](https://axios-http.com/)**: Cliente HTTP para requisições à API do TMDb.
- **[Styled Components](https://styled-components.com/)**: Estilização baseada em componentes.
- **[React Navigation](https://reactnavigation.org/)**: Navegação entre telas.
- **[React Native Vector Icons](https://oblador.github.io/react-native-vector-icons/)**: Ícones customizados para interface.
- **TypeScript**: Para tipagem estática e maior confiabilidade no código.
- **AsyncStorage**: Para guardar informações locais no dispositivo.

## 📦 Instalação e Uso

Siga os passos abaixo para rodar o PopCinema no seu ambiente local:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js**: [Download](https://nodejs.org/)
- **Expo CLI**:
  ```bash
  npm install -g expo-cli
  ```

## Passos para Rodar

1. Clone o repositório:

```bash
git clone https://github.com/LuizOtavioPolido/popcinema.git
cd popcinema
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o `.env`:

```bash
API_KEY=SUA_CHAVE_AQUI
API_URL=https://api.themoviedb.org/3
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run start
```

## Teste Automatizado realizado com [Maestro](https://maestro.mobile.dev/)
No arquivo `teste-maestro.yaml` tem o teste realizado

Aqui está o [video](https://drive.google.com/file/d/1rFKO0ZcPxyPN_8yhgfXv4ZzhtKA9YCz3/view?usp=sharing) do teste realizado