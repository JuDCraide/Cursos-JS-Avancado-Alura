class DataHelper {
    
    constructor() {
        throw new Error('A classe DateHelper não pode ser instânciada');
    }

    static dataParaTexto(data) {

        
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static textoParaData(texto) {
        
        if(!/^\d{4}-\d{2}-\d{2}$/.test(texto)){
            throw new Error('Deve estar no formato aaaa-mm-dd')
        }
        return new Date(texto.split('-'));
    }

}