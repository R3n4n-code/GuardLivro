import type { Livros, LivrosComid } from "../types/type";
const API = ("https://crudcrud.com/api/37af810ef8d34e2bb6a813a6d884596d/livros")


export async function Cria_Livro(novolivro : Livros, livrosatuais: Livros[],setlivros: (valores: LivrosComid[]) => void) { 

try {
    
    

  const resposta = await fetch(API, {


        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novolivro)

    });
    if (!resposta.ok) {
    console.log("Não foi possivel criar um novo livro")
    } 
    const livroCriado = await resposta.json();

    setlivros([...livrosatuais, livroCriado,]);
    

   

} catch (error) {
    console.error(error);
    
    
    
}
}

export async function Lista_Livro() {
try {   
const dados = await fetch(API) 
if (!dados.ok) {
    console.log("erro ao dar GET")

}
const DadosGet = await dados.json();

return DadosGet;
} catch (error) {
    console.error(error);
    
} 
}
export async function Deletar(_id:string, listaAtual:LivrosComid[], setlista: (valor:LivrosComid[])=> void) {
try {    
const dados = await fetch(`${API}/${_id}`,{
    method: "DELETE"});
if (!dados.ok) {
    console.log("erro ao deletar")
}
const listaFiltrada = listaAtual.filter(item => item._id !== _id);

setlista(listaFiltrada)
}catch (error) {
    console.error(error);
}
}
