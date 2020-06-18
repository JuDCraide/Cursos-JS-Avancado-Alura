class DataHelper {

    //como DateHelper só tem métodos estáticos
    //podemos impedir ela de ser instânciada geramos um erro
    constructor() {
        throw new Error('A classe DateHelper não pode ser instânciada');
    }

    //para não ter que criar instância do helper declaramos
    //as funções como estáticas -> static 
    static dataParaTexto(data) {

        //pegar a data em formato de 19/06/2020
        /*return data.getDate() + '/' +
            (data.getMonth() + 1) + '/' +
            data.getFullYear();
        */

        //reescrevemos a string usando template string
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        //usamos expressão regular para testar se a string está no formato correto
        //caso o contrário geramos um erro
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)){
            throw new Error('Deve estar no formato aaaa-mm-dd')
        }
        return new Date(texto.split('-'));
    }

}