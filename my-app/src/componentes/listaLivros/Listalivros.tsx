import type { Livros } from "../../types/type";
import styles from './Listalivros.module.css'

type Props = {
  livros: Livros[];
  deletar: (id: any) => void;
};

export function ListarLivros({ livros, deletar }: Props) {
  return (
    <div className={styles.grid}>
      {livros.map((livro) => (
        
        <div key={livro._id}  className={styles.cardLivros}>
          <div className={styles.autor}>
            <h2 className={styles.zerarmargin}>{livro.titulo}</h2>
          <p className={styles.zerarmargin}>{livro.autor}</p>
          </div ><div className={styles.base}>
          <p className={styles.p}>{livro.status}</p>
          <button className={styles.bnt} onClick={() => deletar(livro._id)}>
            Deletar
          </button>
          </div>
        </div>
        
      ))}
    </div>
  );
}

