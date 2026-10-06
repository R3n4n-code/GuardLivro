import type { Livros } from "../types/type";
import { supabase } from "../supabaseClient";

// Função que cria um novo livro, recebe como parâmetros o livro a ser criado, a lista atual de livros e o useState que vai atualizar a lista atual com o novo livro.
export async function Cria_Livro(
  novolivro: Partial<Livros>,
  livrosatuais: Livros[],
  setlivros: (valores: Livros[]) => void,
) {
  try {
    const { data, error } = await supabase
      .from("livros")
      .insert([novolivro])
      .select();

    if (error) {
      throw new Error("Não foi possivel criar um novo livro");
    }
    const livroCriado = await data[0];

    setlivros([...livrosatuais, livroCriado]);

    return livroCriado;
  } catch (error) {
    console.error(error);
  }
}
// Essa função atualiza os atributos de um livro, recebe como parâmetros o id do livro a ser atualizado e os novos valores que serão atualizados.
export async function Atualizar_Livro(
  idLivro: number,
  valoresNovos: Partial<Pick<Livros, "nota" | "observacao">>,
): Promise<Livros | undefined> {
  try {
    const { data, error } = await supabase
      .from("livros")
      .update(valoresNovos)
      .eq("id", idLivro)
      .select();
    if (error) {
      throw new Error(`Erro ao atualizar atributos: ${error.message}`);
    }
    if (!data || data.length === 0) {
      throw new Error("nenhum dado foi encontrado para atualizar");
    }

    return data[0] as Livros;
  } catch (error) {
    console.error("Erro no Atualizar_Atributos_Livro:", error);
  }
}

// faz um GET e retorna os livros que criamos.
export async function Lista_Livro(): Promise<Livros[] | undefined> {
  try {
    const { data, error } = await supabase.from("livros").select("*");

    if (error) {
      throw new Error("erro ao dar GET");
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Aqui uma função que deleta um livro, recebe como parâmetros o id do livro a ser deletado,
// a lista atual de livros e o useState que vai atualizar a lista atual com os livros restantes.
export async function Deletar(
  idlivro: number,
  listaAtual: Livros[],
  setlista: (valor: Livros[]) => void,
) {
  try {
    const { error } = await supabase.from("livros").delete().eq("id", idlivro);

    if (error) {
      throw new Error("não foi possivel deletar o livro");
    }
    const listaFiltrada = listaAtual.filter((item) => item.id !== idlivro);

    setlista(listaFiltrada);
  } catch (error) {
    console.error(error);
  }
}
