export function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1){
    if(fim <= ini) return

    const pivot = fim
    let div = ini - 1

    for(let i = ini; i < fim; i++){
        if(fnComp(vetor[pivot] , vetor[i])){
            div++
            if(div !== i){
                [ vetor[i], vetor[div] ] = [  vetor[div],  vetor[i] ]
            }
        }
    }
    div++
    if(fnComp(vetor[div] , vetor[pivot]) && div !== pivot){
        [ vetor[div], vetor[pivot] ] = [ vetor[pivot], vetor[div] ]
    }

    quickSort(vetor, fnComp, ini, div - 1)
    quickSort(vetor, fnComp, div + 1, fim)

}