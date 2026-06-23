export type Livros = {
  titulo: string;
  autor: string;
  status: string;
  }

export type LivrosComid = Livros & {
  _id: string
}