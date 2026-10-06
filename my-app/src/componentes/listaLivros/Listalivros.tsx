import type { Livros } from "../../types/type";
import styles from "./Listalivros.module.css";
import { useState } from "react";
import { Atualizar_Livro } from "../../service/LivroService";

// Define o tipo de propriedades que o componente ListarLivros espera receber.
type Props = {
  livros: Livros[];
  deletar: (id: number) => void;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  status: string;
  setLivros: React.Dispatch<React.SetStateAction<Livros[]>>;
};

// Componente que renderiza a lista de livros.
export function ListarLivros({
  livros,
  deletar,
  onChangeStatus,
  status,
  setLivros,
}: Props) {
  // Aqui criamos um estado que vai receber a observação do livro, e que será atualizado quando o usuario digitar algo no input.
  const [OBS, setOBS] = useState<string>("");
  // Aqui criamos um estado que será usado para controlar qual input de observação está sendo exibido, e que será atualizado quando o usuario clicar no botão de adicionar ou editar observação.
  const [mostrarInput, setmostrarInput] = useState<number | null>(null);

  // De longe o componente mais complexo de meu projeto, pois queria que ele fosse dinamico,
  // a ponto de que o usuario possa alterar algo depois que o livro ja foi criado.
  return (
    <div>
      {/*Seletor do nosso filtro que vai receber os dados via props. */}
      <div className={styles.seletorContainer}>
        <select
          onChange={onChangeStatus}
          value={status}
          className={styles.inputSeletor}
        >
          <option value="">Todos</option>
          <option value="LIDO">Lido</option>
          <option value="NÃO LIDO">Não Lido</option>
        </select>
      </div>
      <main className={styles.main}>
        {/* Map que percorre nossa array de livros. usaremos ele boa parte do codigo */}
        {livros.map((livro) => {
          {
            /* Função que chama a função Atualizar_Livro de nosso service, passando o id do livro e os novos valores que serão atualizados. */
          }
          async function ChamaFuncao(novaNota?: number, novaOBS?: string) {
            const dados: Partial<Pick<Livros, "nota" | "observacao">> = {};
            // Aqui verificamos se o que chegou para a função é a nota ou a observação, e atualizamos o objeto "dados" com o que chegou.
            if (novaNota !== undefined) {
              dados.nota = novaNota;
            }
            if (novaOBS !== undefined) {
              dados.observacao = novaOBS;
            }

            const livroAtualizado = await Atualizar_Livro(livro.id, dados);

            if (livroAtualizado) {
              setLivros((livrosAtuais) =>
                livrosAtuais.map((li) =>
                  li.id === livro.id ? livroAtualizado : li,
                ),
              );
            }
          }

          // Aqui retornamaos o HTML do componente utilizamos operadores ternarios, e chamamos nossa função "ChamaFuncao"
          return (
            <div key={livro.id}>
              <div>
                <div className={styles.cardLivros}>
                  <div className={styles.grid}>
                    <div className={styles.autor}>
                      <h2 className={styles.zerarmargin}>{livro.titulo}</h2>

                      <p className={styles.zerarmargin}>{livro.autor}</p>
                    </div>
                    <div>
                      {livro.observacao && (
                        <div>
                          <p>{livro.observacao ?? ""}</p>
                        </div>
                      )}
                      {mostrarInput === livro.id && (
                        <div>
                          <div>
                            <textarea
                              className={styles.Obs}
                              value={OBS}
                              onChange={(e) => {
                                setOBS(e.target.value);
                              }}
                              placeholder="Digite algo..."
                            />

                            <button
                              className={styles.bnt2}
                              onClick={async () => {
                                await ChamaFuncao(undefined, OBS);
                                setmostrarInput(null);
                                setOBS("");
                              }}
                            >
                              Finalizar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.base}>
                      <p className={styles.p}>{livro.status}</p>
                      {livro.observacao && (
                        <button
                          className={styles.bnt2}
                          onClick={async () => {
                            await ChamaFuncao(undefined, OBS);
                            setmostrarInput(livro.id);
                            setOBS("");
                          }}
                        >
                          Editar
                        </button>
                      )}
                      ;
                      {!livro.observacao && !mostrarInput && (
                        <button
                          className={styles.bnt2}
                          onClick={() => {
                            setmostrarInput(livro.id);
                          }}
                        >
                          Adicionar
                        </button>
                      )}
                      <button
                        className={styles.bnt}
                        onClick={() => deletar(livro.id)}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.notadiv}>
                  {/* Outro map que percorre 5 objetos cria nossas cinco estrelas na tela e passa a o valor que foi clicado pelo usuario para nossa função.*/}
                  {[1, 2, 3, 4, 5].map((estrela) => (
                    <button
                      key={estrela}
                      onClick={async () =>
                        await ChamaFuncao(estrela, undefined)
                      }
                      className={
                        estrela <= (livro.nota ?? 0)
                          ? styles.nota2
                          : styles.nota
                      }
                    >
                      {estrela <= (livro.nota ?? 0) ? "★" : "☆"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
