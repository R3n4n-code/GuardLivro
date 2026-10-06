import { useEffect, useState } from "react";
import { LivroForm } from "./componentes/livroForm/livroForm.js";
import { Cria_Livro } from "./service/LivroService.js";
import { Lista_Livro } from "./service/LivroService.js";
import { ListarLivros } from "./componentes/listaLivros/Listalivros.js";
import type { Livros } from "./types/type.js";
import { Deletar } from "./service/LivroService.ts";
import "./app.css";
function App() {
  // Define o primeiro estado do livro atual e da lista de livros por enquanto sem id
  const [livro, setLivro] = useState<Omit<Livros, "id">>({
    titulo: "",
    autor: "",
    status: "LIDO",
    nota: 0,
    observacao: "",
  });

  // Define o estado da lista de livros, que será atualizado com os livros que estão em nossa API.
  const [livros, setLivros] = useState<Livros[]>([]);
  // Define um estado para isolar o valor do estatus clicado pelo usuario que usaremos no filtro.
  const [status, setstatus] = useState("");
  // Aqui o filtro que recebe o nosso estado dos livros e filtra eles com base no que o usuario escolhe.
  const livroFiltrado = livros.filter((livro) => {
    if (status === "") {
      return true;
    }

    return livro.status === status;
  });
  // Aqui defino uma linha de codigo que isola o valor do ID de nossa array que vai ser usada posteriormente.
  const [livroscomID, setlivroscomID] = useState<string | null | void>(null);

  // UseEffect que carrega os livros de nossa API que agora estão com id, e atualiza o estado.
  useEffect(() => {
    async function carregar() {
      const dados = await Lista_Livro();
      if (dados) {
        setLivros(dados);
        console.log(dados);
      } else {
        console.log("não foi possivel carregar os livros salvos");
      }
    }
    carregar();
  }, []);
  // Aqui usamos nosso estado "livroscomID" para a tela se deslocar ate o local onde o componente foi criado.
  useEffect(() => {
    if (!livroscomID) return;

    document.getElementById(String(livroscomID))?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [livroscomID]);
  // Função que chama outra função Cria_Livro de nosso service, passando os dados que pegamos do formulario, e atualizando a lista.
  async function Post() {
    const criarlivro = await Cria_Livro(livro, livros, setLivros);
    setlivroscomID(criarlivro.id);
  }
  // Função que colocaremos em nosso formulário para validar se os campos estão preenchidos, e caso estejam chama a função Post.
  const lidarEnvio = async (evento: React.SubmitEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (!livro.titulo.trim() || !livro.autor.trim()) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    await Post();
  };

  // Retorna os nossos componetes "LivroForm" e o "ListarLivros"
  return (
    <div>
      <LivroForm
        onSubmit={lidarEnvio}
        titulo={livro.titulo}
        autor={livro.autor}
        status={livro.status}
        onChangeTitulo={(e) => setLivro({ ...livro, titulo: e.target.value })}
        onChangeAutor={(e) => setLivro({ ...livro, autor: e.target.value })}
        onChangeStatus={(e) => setLivro({ ...livro, status: e.target.value })}
      />

      <ListarLivros
        livros={livroFiltrado}
        deletar={(id) => Deletar(id, livros, setLivros)}
        onChangeStatus={(e) => setstatus(e.target.value)}
        status={status}
        setLivros={setLivros}
      />
    </div>
  );
}

export default App;
