import { useEffect, useState } from 'react';
import { LivroForm } from './componentes/livroForm/livroForm.js'
import {Cria_Livro,} from './componentes/LivroService.js';
import { Lista_Livro } from './componentes/LivroService.js';
import { ListarLivros } from './componentes/listaLivros/Listalivros.js';
import type { LivrosComid } from './types/type.js';
import { Deletar } from './componentes/LivroService.ts';
import './app.css'
function App() {
const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    status: "",
     
    
});
const [livros, setLivros] = useState<LivrosComid[]>([]);

useEffect(() => {
    async function carregar() {
        const dados = await Lista_Livro();

        setLivros(dados)
        
    }
    carregar()
},[]);

async function Post() {
    await Cria_Livro(livro,livros,setLivros)
}

const lidarEnvio = async (evento: React.SubmitEvent<HTMLFormElement>) =>  {
    evento.preventDefault();

 if (!livro.titulo.trim() || !livro.autor.trim()) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    await Post()
    
    
} 







return (
    <div>
    <LivroForm
     
    onSubmit={lidarEnvio}
    titulo = {livro.titulo}
       autor = {livro.autor} 
       status={livro.status}
       onChangeTitulo = {(e) => setLivro({...livro, titulo: e.target.value, })}
       onChangeAutor = {(e) => setLivro({...livro, autor: e.target.value, })}
       onChangeStatus = {(e) => setLivro({...livro, status: e.target.value, })}
       /> 
       
    <ListarLivros 
    livros={livros}
    deletar={(id) => Deletar(id, livros, setLivros)}>
        
        </ListarLivros>  

       </div>
    


)}


export default App
