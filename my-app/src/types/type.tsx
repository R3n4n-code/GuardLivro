// Define a estrutura de dados para representar um livro, incluindo propriedades como id, título, autor, status, nota e observação. A propriedade "id" é obrigatória, enquanto "nota" e "observacao" são opcionais.
export type Livros = {
  id: number;
  titulo: string;
  autor: string;
  status: string;
  nota?: number;
  observacao?: string;
};
