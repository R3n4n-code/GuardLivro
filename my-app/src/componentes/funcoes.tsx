import type { Livros } from "../types/type";
const API = ("https://crudcrud.com/api/0bc4951762bc4569b221adad0bfd4793/livros")


export async function Cria_Livro(novolivro : Omit<Livros,'_id'>, livrosatuais: Livros[],setlivros: (valores: Livros[]) => void) { 

try {
    
    

  const resposta = await fetch(API, {


        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(novolivro)

    });
    const livroCriado = await resposta.json();

    setlivros([...livrosatuais, livroCriado,]);
    
if (resposta.ok) {
    console.log(livroCriado)
}    

} catch (error) {
    console.error(error);
    
    
    
}
}

export async function Lista_Livro() {
    
const dados = await fetch(API) 

const DadosGet = await dados.json();

return DadosGet;

} 

export async function Deletar(_id:string, listaAtual:Livros[], setlista: (valor:Livros[])=> void) {
    
const dados = await fetch(`${API}/${_id}`,{
    method: "DELETE"});
if (!dados.ok) {
    console.log("erro ao deletar")
}
const listaFiltrada = listaAtual.filter(item => item._id !== _id);

setlista(listaFiltrada)

}

