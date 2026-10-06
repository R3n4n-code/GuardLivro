import type { Livros } from "../../types/type.tsx";
import styles from "./LivroForm.module.css";

// Define uma extensão do type "Livros" com os manipuladores de evento
type Props = Omit<Livros, "id"> & {
  onChangeTitulo: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeAutor: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeStatus: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (evento: React.SubmitEvent<HTMLFormElement>) => void;
};
// Componente do formulario que renderiza o formulário de livro e que receberá as propriedades via props

export function LivroForm({
  titulo,
  autor,
  onChangeTitulo,
  onChangeAutor,
  onChangeStatus,
  onSubmit,
  status,
}: Props) {
  return (
    <div className={styles.centro}>
      <form onSubmit={onSubmit} className={styles.formulario}>
        <h1>Guarda Livros</h1>
        <input
          className={styles.input}
          type="text"
          value={titulo}
          onChange={onChangeTitulo}
          placeholder="Nome do Livro"
        />

        <input
          className={styles.input}
          type="text"
          value={autor}
          onChange={onChangeAutor}
          placeholder="Autor"
        />
        <div className={styles.seletorContainer}>
          <select
            onChange={onChangeStatus}
            value={status}
            className={styles.inputSeletor}
          >
            <option value="LIDO">Já li</option>
            <option value="NÃO LIDO">Quero ler</option>
          </select>
        </div>
        <button type="submit" className={styles.botao}>
          Enviar
        </button>
      </form>
    </div>
  );
}
