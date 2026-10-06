# 📚 GuardLivro — CRUD Profissional Dinâmico

O **GuardLivro** é uma aplicação moderna para gerenciamento e avaliação de livros. Este projeto foi desenvolvido focado em boas práticas de engenharia de software,para se tornar uma aplicação robusta, totalmente tipada, integrada a um banco de dados real na nuvem e coberta por testes automatizados.

## 🚀 Link do Projeto no Ar
👉 [Acesse a aplicação na Vercel aqui](SEU_LINK_DA_VERCEL_AQUI)

---

## 🛠️ Tecnologias e Ferramentas Utilizadas

### Core & Interface
*   **React (Vite):** Estrutura ágil e de alta performance para a renderização dos componentes em tela.
*   **TypeScript:** Tipagem estática avançada em todo o fluxo da aplicação, prevenindo erros em tempo de compilação.
*   **CSS Modules:** Escopo local de estilização (`.module.css`), evitando conflitos globais de classes e mantendo a manutenibilidade visual.

### Back-end & Infraestrutura
*   **Supabase (PostgreSQL):** Banco de dados relacional real rodando na nuvem. A integração elimina persistências temporárias e simula o ecossistema real de uma empresa de tecnologia.

### Qualidade de Código & Testes
*   **Jest:** Framework de testes unitários para validar isoladamente a consistência das regras de negócio.
*   **ESLint:** Linter para garantir padrões rígidos de sintaxe e guias de estilo de mercado.
*   **Prettier:** Formatador de código automatizado para consistência visual e legibilidade entre desenvolvedores.

---

## Estrutura do Projeto

### 1. Separação de Conceitos (Service Layer)
Toda a lógica de infraestrutura e comunicação com a API do Supabase foi completamente removida de dentro dos componentes visuais do React e isolada na camada de serviços (`src/service/LivroService.ts`). Isso garante que os componentes fiquem limpos, focados apenas em renderização e gerenciamento de estado local.

### 2. Modelagem Dinâmica de Dados (Tabela Única)
Buscando performance e eliminação de loops complexos (como `.find()`) no front-end, a aplicação utiliza uma modelagem centralizada. Avaliações (notas por estrelas) e observações textuais pertencem e são salvas diretamente na entidade `Livros` no PostgreSQL, resultando em requisições `GET` instantâneas e otimizadas.

### 3. Tipagem Avançada com Utility Types
Uso consciente das ferramentas nativas do TypeScript para reaproveitamento de código e blindagem contra dados inválidos:
*   **`Pick`**: Isolamento milimétrico de propriedades específicas (ex: capturar apenas nota e observação no momento da atualização).
*   **`Partial`**: Flexibilização segura para o envio de payloads parciais nas requisições do banco de dados.

### 4. Cobertura de Testes com Injeção de Mocks
As funções de serviço estão cobertas por testes unitários com o Jest. Utilizou-se o conceito de **Mocking** para interceptar as chamadas do SDK do Supabase, simulando retornos com precisão e testando a reação dos estados do React sem onerar o banco real ou necessitar de rede ativa.

---

## 🧪 Como Executar os Testes Automatizados

Para validar o funcionamento das regras de CRUD (Criar, Listar e Deletar) de forma automatizada via Jest, rode o comando abaixo no terminal:

```bash
npm run test
```

## 🧪 Como Executar o Prettier

Para testar o funcionamento do prettier e aplicar suas regras que estão definidas em (`src/prettier.config.ts`). Rode o comando abaixo no terminal:

```bash
npm run prettier
```
---

## 💻 Como Rodar o Projeto Localmente

1. Clone este repositório:
   ```bash
   git clone https://github.com
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto e adicione suas chaves do Supabase:
   ```env
   VITE_SUPABASE_URL=sua_url_aqui
   VITE_SUPABASE_ANON_KEY=sua_chave_aqui
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

---

> 📝 **Nota Técnica sobre Infraestrutura:** Este projeto utiliza os planos gratuitos da Vercel e do Supabase. Caso os dados demorem cerca de 30 segundos para carregar no primeiro acesso, trata-se apenas do banco de dados acordando de seu estado de hibernação automática na nuvem.
