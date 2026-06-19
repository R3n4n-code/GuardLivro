import type { Livros } from "../../types/type.tsx";
import styles from './LivroForm.module.css'

type Props = Livros & {
  onChangeTitulo: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChangeAutor: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onChangeStatus: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
 onSubmit: (evento:React.SubmitEvent<HTMLFormElement>
  ) => void;  
};

export function LivroForm({titulo,autor,onChangeTitulo,onChangeAutor,onChangeStatus,onSubmit,status,}: Props) {
  return (
    <div className={styles.centro} >
      
      <form onSubmit={onSubmit} className={styles.formulario}>
        <h1>Guarda Livros</h1>
      <input className={styles.input}
        type="text"
        value={titulo}
        onChange={onChangeTitulo}
        placeholder="Nome do Livro"
      />

      <input className={styles.input}
        type="text"
        value={autor}
        onChange={onChangeAutor}
        placeholder="Autor"
      />
      <select onChange={onChangeStatus} value={status} className={styles.inputSelect}>
         <option value="nenhum">Nenhum</option>
          <option  value="LIDO">Lido</option>
          <option value="NÃO LIDO">Não Lido</option>
       
        
    
      </select>
    <button type="submit" className={styles.botao} >Enviar</button>
    </form>
    </div>
  );
}


