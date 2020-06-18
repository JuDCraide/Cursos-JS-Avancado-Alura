class ListaNegociacoes {

    constructor(){
        this._negociacoes = [];
    }

    adiciona(negociacao){
        this._negociacoes.push(negociacao);
    }

    get negociacoes() {
        //para evitar que alterem negociacoes por fora fazemos ela retornar uma cópia do array
        return [].concat(this._negociacoes);
    }
  

}