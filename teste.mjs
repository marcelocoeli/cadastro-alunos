function gerarRA() {
    return String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
  }
  
function gerarNome() {
    const nomes = ['ANA', 'BRUNO', 'CARLOS', 'DANIELA', 'EDUARDO', 'FERNANDA', 'GABRIEL', 'HELENA', 'IGOR', 'JULIANA'];
    const sobrenomes = ['SILVA', 'OLIVEIRA', 'SOUZA', 'COSTA', 'SANTOS', 'PEREIRA', 'LIMA', 'FERREIRA', 'ALMEIDA', 'RODRIGUES'];
    const nome = nomes[Math.floor(Math.random() * nomes.length)];
    const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
    return `${nome} ${sobrenome}`;
}
  
function gerarIdade() {
    return Math.floor(Math.random() * 10) + 18; 
}
  
function gerarSexo() {
    return Math.random() < 0.5 ? 'Masculino' : 'Feminino';
}
  
function gerarMedia() {
    return +(Math.random() * 10).toFixed(1);
}
  
function gerarResultado(media) {
    return media >= 6 ? 'Aprovado' : 'Reprovado';
}
  
export function gerarAluno() {
    const media = gerarMedia();
    return {
      nome: gerarNome(),
      ra: gerarRA(),
      idade: gerarIdade(),
      sexo: gerarSexo(),
      media: media,
      resultado: gerarResultado(media)
    };
}