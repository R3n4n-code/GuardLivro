import { jest, describe, it, expect } from '@jest/globals';
import { Cria_Livro, Lista_Livro, Deletar } from "./LivroService";
import { supabase } from "../supabaseClient";

// Aqui o esqueleto do Mock global do Supabase para o arquivo não quebrar ao carregar
jest.mock("../supabaseClient", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn(),
  },
}));

describe("Testes do LivroService", () => {
  
  // ==================== TESTE DO POST (Criar) ====================
  it("deve criar um livro com sucesso e atualizar o estado do React", async () => {
    const livroMockado = { id: 1, titulo: "O Hobbit", autor: "Tolkien", status: "LIDO" };

    (supabase.from as jest.Mock).mockImplementation(() => ({
      insert: jest.fn().mockReturnThis(),
      select: (jest.fn() as any).mockResolvedValue({ data: [livroMockado], error: null }),
    }));

    const novolivro = { titulo: "O Hobbit", autor: "Tolkien", status: "LIDO" };
    const livrosatuais = [{ id: 2, titulo: "1984", autor: "George Orwell", status: "LIDO" }];
    const setlivros = jest.fn() as any;

    const resultado = await Cria_Livro(novolivro, livrosatuais, setlivros);

    expect(resultado).toEqual(livroMockado);
    expect(setlivros).toHaveBeenCalledWith([...livrosatuais, livroMockado]);
  });

  // ==================== TESTE DO GET (Listar) ====================
  it("deve listar todos os livros cadastrados com sucesso", async () => {
   
    const listaLivrosMockada = [
      { id: 1, titulo: "O Hobbit", autor: "Tolkien", status: "LIDO" },
      { id: 2, titulo: "1984", autor: "George Orwell", status: "LIDO" }
    ];

  
    (supabase.from as jest.Mock).mockImplementation(() => ({
      select: (jest.fn() as any).mockResolvedValue({ data: listaLivrosMockada, error: null }),
    }));

   
    const resultado = await Lista_Livro();

    
    expect(resultado).toEqual(listaLivrosMockada);
  });

  // ==================== TESTE DO DELETE (Deletar) ====================
it("deve deletar um livro com sucesso e atualizar o estado do React", async () => {
  const idParaDeletar = 1;

 
  (supabase.from as jest.Mock).mockImplementation(() => ({
    delete: jest.fn().mockReturnThis(),
    eq: (jest.fn() as any).mockResolvedValue({ error: null }),
  }));


  const livrosAtuais = [
    { id: 1, titulo: "O Hobbit", autor: "Tolkien", status: "LIDO" },
    { id: 2, titulo: "1984", autor: "George Orwell", status: "LIDO" },
  ];
  
  const setlista = jest.fn() as any; // Função espiã para o React

 
  await Deletar(idParaDeletar, livrosAtuais as any, setlista);


  const listaEsperada = [{ id: 2, titulo: "1984", autor: "George Orwell", status: "LIDO" }];
  
  expect(setlista).toHaveBeenCalledWith(listaEsperada);
});
})
