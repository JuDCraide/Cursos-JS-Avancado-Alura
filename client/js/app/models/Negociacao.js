class Negociacao {

    constructor(data, quantidade, valor){   
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;    
        
        Object.freeze(this);
    }
    
    get data(){
        return new Date(this._data.getTime());
    }
    get quantidade(){
        return this._quantidade
    }
    get valor(){
        return this._valor
    }
    get volume(){
        return this._quantidade * this._valor;
    }

    //como no nosso programa precisamos verificar se uma negociação e igual a outra
    //criamos o método equals que compara a negociação(this) com outra passada por parâmetro
    equals(outraNegociacao){
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
        //também poderiamos fazer assim, comparando cada um dos atributos:
        /*return this._data.getTime() == outraNegociacao.data.getTime()
            && this._valor == outraNegociacao.valor
            && this._quantidade == outraNegociacao.quantidade;
            */
    }
}