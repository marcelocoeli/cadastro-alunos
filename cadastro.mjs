import promptSync from 'prompt-sync';
const prompt = promptSync();
import fs from 'fs';
import { quickSort } from './quick-sort-obj.mjs';
import { gerarAluno } from './teste.mjs';
let alunos = [];

function exibirAlunos(vetor, reprovados=false){
    for(let objeto of vetor){
        if(!reprovados || objeto.resultado === "Aprovado")
        console.log(`
            Nome: ${objeto.nome}
            RA: ${objeto.ra}
            Idade: ${objeto.idade}
            Sexo: ${objeto.sexo}
            Média: ${objeto.media}
            Resultado: ${objeto.resultado}
            `)
    }
}

try {
    const data = fs.readFileSync('alunos.json', 'utf8');
    alunos = JSON.parse(data);
} catch (error) {
    console.error("Erro ao ler arquivo JSON:", error);
}

let op, msg, sair;
do {
  op = Number(prompt(`
    Entre com uma das opções abaixo:

    1. Cadastrar Alunos.
    2. Relatório de Alunos em ordem crescente por Nome.
    3. Relatório de Alunos em ordem decrescente por RA.
    4. Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados.
    5. Encerre a execução do programa.
    
    Opção: `));

    switch (op) {
        case 1:
            do{
                console.clear()
                let novoAluno
                msg = "Cadastrar Aluno\n"
                console.log(msg)
                let nome = prompt("Nome: ")
                msg += "\nNome: " + nome
                let ra
                do {
                    ra = prompt("RA: ")
                    if(ra.length > 8 || !/^\d+$/.test(ra)){
                        console.clear()
                        console.log("*********************RA INVÁLIDO!*********************\n")
                        console.log(msg)
                    }
                } while(ra.length > 8 || !/^\d+$/.test(ra));
                if(ra.length < 8){
                    ra = "0".repeat(8 - ra.length) + ra
                }                
                msg += "\nRA: " + ra
                let idade = Number(prompt("Idade: "))
                msg += "\nIdade: " + idade
                let sexo
                do{
                    sexo = prompt("Sexo [M]asculino [F]eminino: ").toLowerCase()
                    if(sexo != "m" && sexo != "f"){
                        console.clear()
                        console.log("*********************SEXO INVÁLIDO!*********************\n")
                        console.log(msg)
                    }
                } while(sexo != "m" && sexo != "f")
                if (sexo == "m"){
                    sexo = "Masculino"
                } else if (sexo == "f"){
                    sexo = "Feminino"
                }
                msg += "\nSexo: " + sexo
                let media
                do{
                    media = Number(prompt("Média: "))
                    if(media > 10 || media < 0){
                        console.clear()
                        console.log("*********************MÉDIA INVÁLIDA!*********************\n")
                        console.log(msg)
                    }
                }while(media > 10 || media < 0)
                msg += "\nMédia: " + media
                let resultado
                if (media >= 6){
                    resultado = "Aprovado"
                } else {
                    resultado = "Reprovado"
                }
                msg += "\nResultado: " + resultado
                console.clear()                
                novoAluno = {
                    nome: nome,
                    ra: ra,
                    idade: idade,
                    sexo: sexo,
                    media: media,
                    resultado:resultado
                }
                alunos.push(novoAluno);
                fs.writeFileSync('alunos.json', JSON.stringify(alunos, null, 2), 'utf8');
                console.log("Aluno Cadastrado com Sucesso!");
                console.log("Deseja efetuar um novo cadastro?")
                sair = prompt("[S]im para Continuar ou pressione ENTER para voltar").toLowerCase()
            } while (sair == "s")
          break;
        case 2:
            console.clear()
            console.log("Relatório de Alunos em ordem crescente por Nome")
            quickSort(alunos, 
                    (elem1, elem2) => elem1.nome > elem2.nome)
            exibirAlunos(alunos)
            sair = prompt("Pressione ENTER para voltar")
          break;
        case 3:
            console.clear()
            console.log("Relatório de Alunos em ordem decrescente por RA")
            quickSort(alunos, 
                (elem1, elem2) => elem1.ra < elem2.ra)
            exibirAlunos(alunos)
            sair = prompt("Pressione ENTER para voltar")
            break;
        case 4:
            console.clear()
            console.log("Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados")
            quickSort(alunos, 
                    (elem1, elem2) => elem1.nome > elem2.nome)
            exibirAlunos(alunos, true)
            sair = prompt("Pressione ENTER para voltar")
            break;
        default:
            console.clear();
            console.log("*********************OPÇÃO INVÁLIDA!*********************\n")
        case "teste":
            console.clear()
            console.log("Ambiente criado para gerar uma alunos com valores aleatórios\n")
            let quantidade = prompt("Digite quantos alunos deseja criar: ")
            for (let i = 0; i < quantidade; i++) {
                alunos.push(gerarAluno());
            }
            fs.writeFileSync('alunos.json', JSON.stringify(alunos, null, 2), 'utf8');
            console.log(`${quantidade} alunos criados com Sucesso!\n`)
            sair = prompt("Pressione ENTER para voltar")
        break;
      }
} while (op !== 5);
console.clear();
console.log(`Programa encerrado.`)